var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#OpenEphysLoader.jl-Documentation-1",
    "page": "Home",
    "title": "OpenEphysLoader.jl Documentation",
    "category": "section",
    "text": "A set of tools to load data files made by the OpenEphys GUInote: Note\nThis module is experimental, and may damage your data. No module functions intentionally modify the contents of data files, but use this module at your own risk."
},

{
    "location": "index.html#Package-Features-1",
    "page": "Home",
    "title": "Package Features",
    "category": "section",
    "text": "Read contents of continuous data files without loading the entire file into memory\nArray interface to sample values, time stamps, and recording numbers\nFlexibly typed output provides access to raw sample values or converted voltage values\nAccess metadata about Open Ephys recordings"
},

{
    "location": "index.html#Example-Usage-1",
    "page": "Home",
    "title": "Example Usage",
    "category": "section",
    "text": "OpenEphysLoader.jl provides array types to access file contents. Values accessed through these subtypes of OEArray have an array interface backed by file contents, instead of memory.docpath = @__FILE__()\ndocdir = dirname(docpath)\nrelloadpath = joinpath(docdir, \"../test/data\")\ndatadir = realpath(relloadpath)\nabsloadfile = joinpath(datadir, \"100_AUX1.continuous\")\nopen(absloadfile, \"r\") do dataio\n    global databytes = read(dataio, 3094)\nend\npath, tmpio = mktemp()\ntry\n    write(tmpio, databytes)\nfinally\n    close(tmpio)\nendusing OpenEphysLoader\nopen(path, \"r\") do io\n    A = SampleArray(io)\n    A[1:3]\nendTo pull the entire file contents into memory, use Array(OEArray).The metadata of recordings can be accessed using the metadata function:using OpenEphysLoader\nmeta = metadata(datadir)rm(path)"
},

{
    "location": "index.html#Library-Outline-1",
    "page": "Home",
    "title": "Library Outline",
    "category": "section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]"
},

{
    "location": "lib/public.html#",
    "page": "Public",
    "title": "Public",
    "category": "page",
    "text": ""
},

{
    "location": "lib/public.html#OpenEphysLoader",
    "page": "Public",
    "title": "OpenEphysLoader",
    "category": "Module",
    "text": "Module to read the binary data files created by the OpenEphys GUI\n\nProvides array interfaces to file contents, without loading the entire file into memory\n\n\n\n"
},

{
    "location": "lib/public.html#Public-Documentation-1",
    "page": "Public",
    "title": "Public Documentation",
    "category": "section",
    "text": "Documentation for exported functions and types for OpenEphysLoader.jlOpenEphysLoader"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEArray",
    "page": "Public",
    "title": "OpenEphysLoader.OEArray",
    "category": "Type",
    "text": "Abstract array for file-backed OpenEphys data.\n\nAll subtypes support a ready-only array interface and should be constructable with a single IOStream argument.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEContArray",
    "page": "Public",
    "title": "OpenEphysLoader.OEContArray",
    "category": "Type",
    "text": "Abstract array for file-backed continuous OpenEphys data.\n\nWill throw CorruptedException if the data file has a corrupt OriginalHeader, is not the correct size for an .continuous file, or contains corrupt data blocks.\n\nSubtype of abstract type OEArray are read only, and have with the following fields:\n\nFields\n\ncontfile ContinuousFile for the current file.\n\nblock buffer object for the data blocks in the file.\n\nblockno the current block being access in the file.\n\ncheck Bool to check each data block's validity.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.SampleArray",
    "page": "Public",
    "title": "OpenEphysLoader.SampleArray",
    "category": "Type",
    "text": "SampleArray(type::Type{T}, io::IOStream, [check::Bool])\n\nSubtype of OEContArray to provide file backed access to OpenEphys sample values. If type is a floating point type, then the sample value will be converted to voltage (in uV). Otherwise, the sample values will remain the raw ADC integer readings.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.TimeArray",
    "page": "Public",
    "title": "OpenEphysLoader.TimeArray",
    "category": "Type",
    "text": "TimeArray(type::Type{T}, io::IOStream, [check::Bool])\n\nSubtype of OEContArray to provide file backed access to OpenEphys time stamps. If type is a floating point type, then the time stamps will be converted to seconds. Otherwise, the time stamp will be the sample number.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.RecNoArray",
    "page": "Public",
    "title": "OpenEphysLoader.RecNoArray",
    "category": "Type",
    "text": "RecNoArray(type::Type{T}, io::IOStream, [check::Bool])\n\nSubtype of OEContArray to provide file backed access to OpenEphys numbers.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.JointArray",
    "page": "Public",
    "title": "OpenEphysLoader.JointArray",
    "category": "Type",
    "text": "JointArray(type::Type{T}, io::IOStream, [check::Bool])\n\nSubtype of OEContArray to provide file backed access to OpenEphys data. Returns a tuple of type type, whose values represent (samplevalue, timestamp, recordingnumber). For a description of each, see SampleArray, TimeArray, and RecNoArray, respectively.\n\n\n\n"
},

{
    "location": "lib/public.html#Array-types-1",
    "page": "Public",
    "title": "Array types",
    "category": "section",
    "text": "All array types are subtypes of the abstract type OEArray, and data from continuous files are subtypes of the abstract type  OEContArray.OEArray\nOEContArrayThe following array types can be used to access different aspects of the data:SampleArray\nTimeArray\nRecNoArrayAlternatively, all three aspects can be accessed simultaneously:JointArray"
},

{
    "location": "lib/public.html#OpenEphysLoader.OriginalHeader",
    "page": "Public",
    "title": "OpenEphysLoader.OriginalHeader",
    "category": "Type",
    "text": "OriginalHeader(io::IOStream)\n\nData in the header of binary OpenEphys files.\n\nWill throw CorruptedException if header is corrupt, not an \"OpenEphys\" data format, or not version 0.4 of the data format.\n\nFields\n\nformat is the name of the data format.\n\nversion is the version number of the data format.\n\nheaderbytes is the number of bytes in the header.\n\ndescription is a description of the header.\n\ncreated is the date and time the file was created.\n\nchannel is the name of the channel used to acquire this data.\n\nchanneltype is the type of channel used to acquire this data.\n\nsamplerate is the sampling rate in Hz.\n\nblocklength is the length in bytes of each block of data within the file.\n\nbuffersize is the size of the buffer used during acquisition, in bytes.\n\nbitvolts are the Volts per ADC bit.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.ContinuousFile",
    "page": "Public",
    "title": "OpenEphysLoader.ContinuousFile",
    "category": "Type",
    "text": "ContinuousFile(io::IOStream)\n\nType for an open continuous file.\n\nFields\n\nio IOStream object.\n\nnsample number of samples in a file.\n\nnblock number of data blocks in a file.\n\nheader OriginalHeader of the current file.\n\n\n\n"
},

{
    "location": "lib/public.html#Information-types-1",
    "page": "Public",
    "title": "Information types",
    "category": "section",
    "text": "The following types provide information about OpenEphys filesOriginalHeader\nContinuousFile"
},

{
    "location": "lib/public.html#OpenEphysLoader.metadata",
    "page": "Public",
    "title": "OpenEphysLoader.metadata",
    "category": "Function",
    "text": "metadata([dirpath::AbstractString = pwd()]; settingsfile = \"settings.xml\", continuousmeta=\"Continuous_Data.openephys\")\n\nTop-level function to read a directory and parse the settings.xml and Continuous_data.openeephys files.\n\nreturns a OEExperMeta.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEExperMeta",
    "page": "Public",
    "title": "OpenEphysLoader.OEExperMeta",
    "category": "Type",
    "text": "OEExperMeta{S<:AbstractString, T<:OEProcessor}(s::OESettings, exper::LightXML.XMLElement)\n\nType to represent the Experiment metadata in Continuous_Data.openephys.\n\nConstruct with the OESettings from settings.xml and XML experiment element.\n\nFields\n\nfile_version VersionNumber continuous file format version\n\nexperiment_number Int experiment number\n\nseparate_files Bool true if files are separate\n\nrecordings Vector{OERecordingMeta{T}} Vector of each OERecordingMeta within the experiment\n\nsettings OESettings of the settings.xml file\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OESettings",
    "page": "Public",
    "title": "OpenEphysLoader.OESettings",
    "category": "Type",
    "text": "OESettings{S<:AbstractString, T<:OEProcessor}(xdoc::LightXML.XMLDocument)\n\nType to represent information in the settings.xml file made by the Open Ephys GUI.\n\nConstruct with the XML document for settings.xml\n\nFields\n\ninfo OEInfo GUI info.\n\nrecording_chain OESignalTree Signal tree that leads to recording processors.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEInfo",
    "page": "Public",
    "title": "OpenEphysLoader.OEInfo",
    "category": "Type",
    "text": "OEInfo{T<:AbstractString}(info_e::LigthXML.XMLElement)\n\nType to represent the info element in settings.xml made by Open Ephys.\n\nConstruct with the XML info element.\n\nFields\n\ngui_version VersionNumber GUI version\n\nplugin_api_version VersionNumber plugin API version. If gui_version is less than 0.4.0 then this will be 0\n\ndatetime DateTime date and time that settings.xml was made\n\nos T Operating system of computer running GUI\n\nmachine T hostname of computer running GUI\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OERecordingMeta",
    "page": "Public",
    "title": "OpenEphysLoader.OERecordingMeta",
    "category": "Type",
    "text": "OERecordingMeta{T<:OEProcessor}(settings::OESettings, rec_e::LightXML.XMLElement)\n\nType that represents recording metadata in Continuous_Data.openephys file made by the Open Ephys GUI.\n\nConstruct with a OESettings from the settings.xml file, and the XML recording element of the Continuous_Data.openephys file.\n\nFields\n\nnumber Int Recording number\n\nsamplerate Float64 Sampling rate\n\nrecording_processors Vector{T} list of recording processors\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEProcessor",
    "page": "Public",
    "title": "OpenEphysLoader.OEProcessor",
    "category": "Type",
    "text": "OEProcessor{T<:AbstractString}\n\nAbstract type for recording Open Ephys processors.\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OERhythmProcessor",
    "page": "Public",
    "title": "OpenEphysLoader.OERhythmProcessor",
    "category": "Type",
    "text": "OERhythmProcessor{T<:AbstractString}(proc_e::LightXML.XMLElement)\n\nType for Rhythm processor metadata, subtype of OEProcessor.\n\nConstruct with XML element for processor.\n\nFields\n\nid Int of processor ID in GUI\n\nlowcut Float64 of low pass filter cutoff on headstages\n\nhighcut Float64 of high pass filter cutoff on headstages\n\nadcs_on Bool true if ADCs on\n\nnoiseslicer Bool true if noiseslicer used for ADC\n\nttl_fastsettle Bool true if TTL fast settle used\n\ndac_ttl Bool true if dac ttl is on\n\ndac_hpf Bool true if dac hpf is on\n\ndsp_offset Bool true if headstage DSP offset removal is used\n\ndsp_cutoff Float64 of DSP high pass filter cutoff\n\nchannels Vector{OEChannel{T}} list of OEChannel in Rhythm processor\n\n\n\n"
},

{
    "location": "lib/public.html#OpenEphysLoader.OEChannel",
    "page": "Public",
    "title": "OpenEphysLoader.OEChannel",
    "category": "Type",
    "text": "OEChannel{T<:AbstractString}\n\nType for continuous recording channel metadata\n\nFields\n\nname T of channel name\n\nnumber Int of channel number in GUI\n\nbitvolts Float64 of volts per ADC bit\n\nposition Int position of data in file.\n\nfilename T name of associated .continuous file\n\n\n\n"
},

{
    "location": "lib/public.html#Recording-metadata-1",
    "page": "Public",
    "title": "Recording metadata",
    "category": "section",
    "text": "Information about the recording session can be gathered from the  settings.xml and Continuous_Data.openephys files by using the  metadata function. The contents of the metadata files are  contained in the OEExperMeta datatype.metadata\nOEExperMeta\nOESettings\nOEInfo\nOERecordingMeta\nOEProcessor\nOERhythmProcessor\nOEChannel"
},

{
    "location": "lib/public.html#OpenEphysLoader.CorruptedException",
    "page": "Public",
    "title": "OpenEphysLoader.CorruptedException",
    "category": "Type",
    "text": "Exception type to indicate a malformed data file\n\n\n\n"
},

{
    "location": "lib/public.html#Exceptions-1",
    "page": "Public",
    "title": "Exceptions",
    "category": "section",
    "text": "CorruptedException"
},

{
    "location": "lib/internals.html#",
    "page": "Internals",
    "title": "Internals",
    "category": "page",
    "text": ""
},

{
    "location": "lib/internals.html#OpenEphysLoader.BlockBuffer",
    "page": "Internals",
    "title": "OpenEphysLoader.BlockBuffer",
    "category": "Type",
    "text": "Type to buffer continuous file contents\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.BlockHeader",
    "page": "Internals",
    "title": "OpenEphysLoader.BlockHeader",
    "category": "Type",
    "text": "Represents the header of each data block\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.DataBlock",
    "page": "Internals",
    "title": "OpenEphysLoader.DataBlock",
    "category": "Type",
    "text": "Represents the entirety of a data block\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.MATLABdata",
    "page": "Internals",
    "title": "OpenEphysLoader.MATLABdata",
    "category": "Type",
    "text": "Abstract class for representing matlab code fragments\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.MATfloat",
    "page": "Internals",
    "title": "OpenEphysLoader.MATfloat",
    "category": "Type",
    "text": "type for representing Matlab floatingpoint numbers\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.MATint",
    "page": "Internals",
    "title": "OpenEphysLoader.MATint",
    "category": "Type",
    "text": "Type for representing Matlab integers\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.MATstr",
    "page": "Internals",
    "title": "OpenEphysLoader.MATstr",
    "category": "Type",
    "text": "Type for representing Matlab strings\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.OESignalTree",
    "page": "Internals",
    "title": "OpenEphysLoader.OESignalTree",
    "category": "Type",
    "text": "OESignalTree{T<:OEProcessor}(chain_e::LightXML.XMLElement, [recording_anmes::Set])\n\nSignal tree for recording processors. Since OpenEphysLoader currently on works on .continuous file types, this will search for the first OERhythmProcessor and make a signal tree up to that point.\n\nConstruct with a XML signalchain element, and a set of processor names that are valid recording nodes.\n\nSee Tree for field information.\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.SignalNode",
    "page": "Internals",
    "title": "OpenEphysLoader.SignalNode",
    "category": "Type",
    "text": "SignalNode{T<:OEProcessor}\n\nNode type for OEProcessor signal chain, subtype of TreeNode.\n\nSee TreeNode for information on fields.\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.Tree",
    "page": "Internals",
    "title": "OpenEphysLoader.Tree",
    "category": "Type",
    "text": "Tree{T}\n\nAbstract type for tree structure, with type T content.\n\nContains a group of TreeNode in the single required field:\n\nRequired Fields\n\nnodes Indexable list of TreeNode elements.\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.TreeNode",
    "page": "Internals",
    "title": "OpenEphysLoader.TreeNode",
    "category": "Type",
    "text": "TreeNode{T}\n\nAbstract node type for tree structure, with type T content.\n\nSubtypes must have the following fields:\n\nRequired Fields\n\ncontent T content of node.\n\nparent Int ID of parent node\n\nchildren Vector{Int} IDs of children node\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.add_continuous_meta!-Tuple{OpenEphysLoader.OESettings,LightXML.XMLElement}",
    "page": "Internals",
    "title": "OpenEphysLoader.add_continuous_meta!",
    "category": "Method",
    "text": "Add data from Continuous_Data.openephys to OESettings from settings.xml\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.channel_arr",
    "page": "Internals",
    "title": "OpenEphysLoader.channel_arr",
    "category": "Function",
    "text": "Parse XML Element PROCESSOR and recover channel metadata.\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.check_filesize-Tuple{IOStream}",
    "page": "Internals",
    "title": "OpenEphysLoader.check_filesize",
    "category": "Method",
    "text": "Check that file could be comprised of header and complete data blocks\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.convert_block!-Tuple{OpenEphysLoader.DataBlock}",
    "page": "Internals",
    "title": "OpenEphysLoader.convert_block!",
    "category": "Method",
    "text": "Convert the wacky data format in OpenEphys continuous files\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.find_matching_proc-Tuple{OpenEphysLoader.OESignalTree,LightXML.XMLElement}",
    "page": "Internals",
    "title": "OpenEphysLoader.find_matching_proc",
    "category": "Method",
    "text": "Find id of processor in OESignalTree that matches id of XML processor element\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.matread-Tuple{Type{T<:OpenEphysLoader.MATLABdata},S<:AbstractString}",
    "page": "Internals",
    "title": "OpenEphysLoader.matread",
    "category": "Method",
    "text": "read a Matlab source line\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.parseline",
    "page": "Internals",
    "title": "OpenEphysLoader.parseline",
    "category": "Function",
    "text": "Parse a line of Matlab source code\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.parseto",
    "page": "Internals",
    "title": "OpenEphysLoader.parseto",
    "category": "Function",
    "text": "Convert a string to the desired type\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.prepare_block!-Tuple{OpenEphysLoader.OEContArray,Integer}",
    "page": "Internals",
    "title": "OpenEphysLoader.prepare_block!",
    "category": "Method",
    "text": "Load data block if necessary\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.read_into!",
    "page": "Internals",
    "title": "OpenEphysLoader.read_into!",
    "category": "Function",
    "text": "Read file data block into data block buffer\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.read_into!-Tuple{IOStream,OpenEphysLoader.BlockHeader}",
    "page": "Internals",
    "title": "OpenEphysLoader.read_into!",
    "category": "Method",
    "text": "Read block header into header buffer\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.seek_to_block-Tuple{IOStream,Integer}",
    "page": "Internals",
    "title": "OpenEphysLoader.seek_to_block",
    "category": "Method",
    "text": "Move io to data block\n\n\n\n"
},

{
    "location": "lib/internals.html#OpenEphysLoader.verify_tail!-Tuple{IOStream,Array{UInt8,1}}",
    "page": "Internals",
    "title": "OpenEphysLoader.verify_tail!",
    "category": "Method",
    "text": "Verify end of block marker\n\n\n\n"
},

{
    "location": "lib/internals.html#Package-Internals-1",
    "page": "Internals",
    "title": "Package Internals",
    "category": "section",
    "text": "Documentation of the OpenEphysLoader.jl internals.Modules = [OpenEphysLoader]\nPublic = false"
},

]}