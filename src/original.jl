# Type system for original files and header constants
# I'm using types as a enum here, consider changing this?
"Abstract class for representing matlab code fragments"
abstract MATLABdata
"Type for representing Matlab strings"
type MATstr <: MATLABdata end
"Type for representing Matlab integers"
type MATint <: MATLABdata end
"type for representing Matlab floatingpoint numbers"
type MATfloat <: MATLABdata end

type CorruptedException <: Exception end

### Constants for parsing header ###
const HEADER_N_BYTES = 1024
const HEADER_DATEFORMAT = Dates.DateFormat("d-u-y HHMMSS")
const HEADER_TYPE_MAP = ((MATstr, String), #Format
                        (MATfloat, VersionNumber), #Version
                        (MATint, Int), #headerbytes
                        (MATstr, String), #description
                        (MATstr, DateTime), #created
                        (MATstr, String), #channel
                        (MATstr, String), #channeltype
                        (MATint, Int), #samplerate
                        (MATint, Int), #blocklength
                        (MATint, Int), #buffersize
                        (MATfloat, Float64)) #bitvolts
const HEADER_MATTYPES = [x[1] for x in HEADER_TYPE_MAP]
const HEADER_TARGET_TYPES = [x[2] for x in HEADER_TYPE_MAP]
const N_HEADER_LINE = length(HEADER_TYPE_MAP)

"""
    OriginalHeader{T<:AbstractString, S<:Integer, R<:Real}
Data in the header of binary OpenEphys files
"""
immutable OriginalHeader{T<:AbstractString, S<:Integer, R<:Real}
    "Data format"
    format::T
    "Version of data format"
    version::VersionNumber
    "Number of bytes in the header"
    headerbytes::S
    "Description of the header"
    description::T
    "Time file created"
    created::DateTime
    "Channel name"
    channel::T
    "Channel type"
    channeltype::T
    "Sample rate for file"
    samplerate::S
    "Length of data blocks in bytes"
    blocklength::S
    "Size of buffer in bytes"
    buffersize::S
    "Volts/bit of ADC values"
    bitvolts::R
end
"""
    OriginalHeader(io::IOStream)
Reads the header of the open binary file `io`. Assumes that the stream
is at the beginning of the file.
"""
function OriginalHeader(io::IOStream)
    # Read the header from the IOStream and separate on semicolons
    head = read(io, HEADER_N_BYTES)
    @assert length(head) == HEADER_N_BYTES "Header not complete"
    headstr = transcode(String, head)
    substrs =  split(headstr, ';', keep = false)
    resize!(substrs, N_HEADER_LINE)
    OriginalHeader(
        map(parseline, zip(HEADER_MATTYPES, HEADER_TARGET_TYPES, substrs))...
    )::OriginalHeader{String, Int, Float64}
end

"Parse a line of Matlab source code"
function parseline end
parseline{T, M<:MATLABdata}(::Type{M}, ::Type{T}, str::AbstractString) = parseto(T, matread(M, str))::T
parseline(tup::Tuple) = parseline(tup...)

"Convert a string to the desired type"
function parseto end
parseto{T<:Number}(::Type{T}, str::AbstractString) = parse(str)::T
parseto(::Type{DateTime}, str::AbstractString) = DateTime(str, HEADER_DATEFORMAT)
parseto(::Type{VersionNumber}, str::AbstractString) = VersionNumber(str)
parseto(::Type{String}, str::AbstractString) = String(str)
parseto{T<:AbstractString}(::Type{T}, str::T) = str

"read a Matlab source line"
function matread{T<:MATLABdata, S<:AbstractString}(::Type{T}, str::S)
    regex = rx(T)
    goodread = false
    if ismatch(regex, str)
        m = match(rx(T), str)
        if !isempty(m.captures)
            goodread = true
        end
    end
    goodread || throw(CorruptedException())
    return S(m.captures[1])
end

### Matlab regular expressions ###
rx(::Type{MATstr}) = r" = '(.*)'$"
rx(::Type{MATint}) = r" = (\d*)$"
rx(::Type{MATfloat}) = r" = ([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)$"

function show(io::IO, a::OriginalHeader)
    fields = fieldnames(a)
    for field in fields
        println(io, "$field: $(getfield(a, field))")
    end
end
showcompact(io::IO, header::OriginalHeader) = show(io, "channel: $(header.channel)")
function show(io::IO, headers::Vector{OriginalHeader})
    for header in headers
        println(io, showcompact(header))
    end
end
