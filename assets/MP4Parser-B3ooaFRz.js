import{c as $,m as W,U as o,S,F as L,a as g,r as k,b as p,d as I,I as u,y as l,z as M,C as N,w as _,B as b,T as H,u as V,D as j,G,H as q}from"./index-ASeBwoxR.js";import"./index-C1xIFlgX.js";/* empty css                    *//* empty css                        *//* empty css                  *//* empty css               */import"./index-XZ15LRdO.js";const O=$("music-metadata:parser:MP4:atom");class T extends W("MP4"){}const C={len:8,get:(i,e)=>{const t=o.get(i,e);if(t<0)throw new T("Invalid atom header length");return{length:BigInt(t),name:new S(4,"latin1").get(i,e+4)}},put:(i,e,t)=>(o.put(i,e,Number(t.length)),L.put(i,e+4,t.name))},Q=_,D={len:4,get:(i,e)=>({type:new S(4,"ascii").get(i,e)})};class U{constructor(e,t,a){if(this.len=e,e<t)throw new T(`Atom ${a} expected to be ${t}, but specifies ${e} bytes long.`);e>t&&O(`Warning: atom ${a} expected to be ${t}, but was actually ${e} bytes long.`)}}const w={len:4,get:(i,e)=>{const t=o.get(i,e)-2082844800;return new Date(t*1e3)}};class J extends U{constructor(e){super(e,24,"mdhd"),this.len=e}get(e,t){return{version:g.get(e,t+0),flags:k.get(e,t+1),creationTime:w.get(e,t+4),modificationTime:w.get(e,t+8),timeScale:o.get(e,t+12),duration:o.get(e,t+16),language:p.get(e,t+20),quality:p.get(e,t+22)}}}class X extends U{constructor(e){super(e,100,"mvhd"),this.len=e}get(e,t){return{version:g.get(e,t),flags:k.get(e,t+1),creationTime:w.get(e,t+4),modificationTime:w.get(e,t+8),timeScale:o.get(e,t+12),duration:o.get(e,t+16),preferredRate:o.get(e,t+20),preferredVolume:p.get(e,t+24),previewTime:o.get(e,t+72),previewDuration:o.get(e,t+76),posterTime:o.get(e,t+80),selectionTime:o.get(e,t+84),selectionDuration:o.get(e,t+88),currentTime:o.get(e,t+92),nextTrackID:o.get(e,t+96)}}}class Y{constructor(e){this.len=e}get(e,t){return{type:{set:g.get(e,t+0),type:k.get(e,t+1)},locale:k.get(e,t+4),value:new I(this.len-8).get(e,t+8)}}}class Z{constructor(e){this.len=e}get(e,t){return{version:g.get(e,t),flags:k.get(e,t+1),name:new S(this.len-4,"utf-8").get(e,t+4)}}}class f{constructor(e){this.len=e}get(e,t){return{version:g.get(e,t),flags:k.get(e,t+1),creationTime:w.get(e,t+4),modificationTime:w.get(e,t+8),trackId:o.get(e,t+12),duration:o.get(e,t+20),layer:p.get(e,t+24),alternateGroup:p.get(e,t+26),volume:p.get(e,t+28)}}}const E={len:8,get:(i,e)=>({version:g.get(i,e),flags:k.get(i,e+1),numberOfEntries:o.get(i,e+4)})};class K{constructor(e){this.len=e}get(e,t){return{dataFormat:L.get(e,t),dataReferenceIndex:p.get(e,t+10),description:new I(this.len-12).get(e,t+12)}}}class ee{constructor(e){this.len=e}get(e,t){const a=E.get(e,t);t+=E.len;const s=[];for(let n=0;n<a.numberOfEntries;++n){const r=o.get(e,t);t+=o.len,s.push(new K(r).get(e,t)),t+=r}return{header:a,table:s}}}const x={len:8,get(i,e){return{version:u.get(i,e),revision:u.get(i,e+2),vendor:l.get(i,e+4)}}},te={len:12,get(i,e){return{numAudioChannels:u.get(i,e+0),sampleSize:u.get(i,e+2),compressionId:u.get(i,e+4),packetSize:u.get(i,e+6),sampleRate:p.get(i,e+8)+p.get(i,e+10)/1e4}}};class v{constructor(e,t){this.len=e,this.token=t}get(e,t){const a=l.get(e,t+4);return{version:M.get(e,t+0),flags:N.get(e,t+1),numberOfEntries:a,entries:R(e,this.token,t+8,this.len-8,a)}}}const ae={len:8,get(i,e){return{count:l.get(i,e+0),duration:l.get(i,e+4)}}};class se extends v{constructor(e){super(e,ae),this.len=e}}const ne={len:12,get(i,e){return{firstChunk:l.get(i,e),samplesPerChunk:l.get(i,e+4),sampleDescriptionId:l.get(i,e+8)}}};class ie extends v{constructor(e){super(e,ne),this.len=e}}class re{constructor(e){this.len=e}get(e,t){const a=l.get(e,t+8);return{version:M.get(e,t),flags:N.get(e,t+1),sampleSize:l.get(e,t+4),numberOfEntries:a,entries:R(e,l,t+12,this.len-12,a)}}}class oe extends v{constructor(e){super(e,l),this.len=e}}class ce{constructor(e){this.len=e}get(e,t){const a=u.get(e,t+0);return new S(a,"utf-8").get(e,t+2)}}function R(i,e,t,a,s){if(O(`remainingLen=${a}, numberOfEntries=${s} * token-len=${e.len}`),a===0)return[];if(a!==s*e.len)throw new T("mismatch number-of-entries with remaining atom-length");const n=[];for(let r=0;r<s;++r)n.push(e.get(i,t)),t+=e.len;return n}const P=$("music-metadata:parser:MP4:Atom");class A{static async readAtom(e,t,a,s){const n=e.position;P(`Reading next token on offset=${n}...`);const r=await e.readToken(C),c=r.length===1n;c&&(r.length=await e.readToken(Q));const d=new A(r,c,a),h=d.getPayloadLength(s);return P(`parse atom name=${d.atomPath}, extended=${d.extended}, offset=${n}, len=${d.header.length}`),await d.readData(e,t,h),d}constructor(e,t,a){this.header=e,this.extended=t,this.parent=a,this.children=[],this.atomPath=(this.parent?`${this.parent.atomPath}.`:"")+this.header.name}getHeaderLength(){return this.extended?16:8}getPayloadLength(e){return(this.header.length===0n?e:Number(this.header.length))-this.getHeaderLength()}async readAtoms(e,t,a){for(;a>0;){const s=await A.readAtom(e,t,this,a);this.children.push(s),a-=s.header.length===0n?a:Number(s.header.length)}}async readData(e,t,a){switch(this.header.name){case"moov":case"udta":case"trak":case"mdia":case"minf":case"stbl":case"<id>":case"ilst":case"tref":return this.readAtoms(e,t,this.getPayloadLength(a));case"meta":{const n=(await e.peekToken(C)).name==="hdlr"?0:4;return await e.ignore(n),this.readAtoms(e,t,this.getPayloadLength(a)-n)}default:return t(this,a)}}}const m=$("music-metadata:parser:MP4"),de="iTunes",F={raw:{lossy:!1,format:"raw"},MAC3:{lossy:!0,format:"MACE 3:1"},MAC6:{lossy:!0,format:"MACE 6:1"},ima4:{lossy:!0,format:"IMA 4:1"},ulaw:{lossy:!0,format:"uLaw 2:1"},alaw:{lossy:!0,format:"uLaw 2:1"},Qclp:{lossy:!0,format:"QUALCOMM PureVoice"},".mp3":{lossy:!0,format:"MPEG-1 layer 3"},alac:{lossy:!1,format:"ALAC"},"ac-3":{lossy:!0,format:"AC-3"},mp4a:{lossy:!0,format:"MPEG-4/AAC"},mp4s:{lossy:!0,format:"MP4S"},c608:{lossy:!0,format:"CEA-608"},c708:{lossy:!0,format:"CEA-708"}};function B(i,e,t){return t.indexOf(i)===e}class z extends b{constructor(){super(...arguments),this.tracks=[],this.atomParsers={mvhd:async e=>{const t=await this.tokenizer.readToken(new X(e));this.metadata.setFormat("creationTime",t.creationTime),this.metadata.setFormat("modificationTime",t.modificationTime)},mdhd:async e=>{const t=await this.tokenizer.readToken(new J(e)),a=this.getTrackDescription();a.creationTime=t.creationTime,a.modificationTime=t.modificationTime,a.timeScale=t.timeScale,a.duration=t.duration},chap:async e=>{const t=this.getTrackDescription(),a=[];for(;e>=o.len;)a.push(await this.tokenizer.readNumber(o)),e-=o.len;t.chapterList=a},tkhd:async e=>{const t=await this.tokenizer.readToken(new f(e));this.tracks.push(t)},mdat:async e=>{if(this.audioLengthInBytes=e,this.calculateBitRate(),this.options.includeChapters){const t=this.tracks.filter(a=>a.chapterList);if(t.length===1){const a=t[0].chapterList,s=this.tracks.filter(n=>a.indexOf(n.trackId)!==-1);if(s.length===1)return this.parseChapterTrack(s[0],t[0],e)}}await this.tokenizer.ignore(e)},ftyp:async e=>{const t=[];for(;e>0;){const s=await this.tokenizer.readToken(D);e-=D.len;const n=s.type.replace(/\W/g,"");n.length>0&&t.push(n)}m(`ftyp: ${t.join("/")}`);const a=t.filter(B).join("/");this.metadata.setFormat("container",a)},stsd:async e=>{const t=await this.tokenizer.readToken(new ee(e)),a=this.getTrackDescription();a.soundSampleDescription=t.table.map(s=>this.parseSoundSampleDescription(s))},stsc:async e=>{const t=await this.tokenizer.readToken(new ie(e));this.getTrackDescription().sampleToChunkTable=t.entries},stts:async e=>{const t=await this.tokenizer.readToken(new se(e));this.getTrackDescription().timeToSampleTable=t.entries},stsz:async e=>{const t=await this.tokenizer.readToken(new re(e)),a=this.getTrackDescription();a.sampleSize=t.sampleSize,a.sampleSizeTable=t.entries},stco:async e=>{const t=await this.tokenizer.readToken(new oe(e));this.getTrackDescription().chunkOffsetTable=t.entries},date:async e=>{const t=await this.tokenizer.readToken(new S(e,"utf-8"));await this.addTag("date",t)}}}static read_BE_Integer(e,t){const a=(t?"INT":"UINT")+e.length*8+(e.length>1?"_BE":""),s=G[a];if(!s)throw new T(`Token for integer type not found: "${a}"`);return Number(s.get(e,0))}async parse(){this.tracks=[];let e=this.tokenizer.fileInfo.size||0;for(;!this.tokenizer.fileInfo.size||e>0;){try{if((await this.tokenizer.peekToken(C)).name==="\0\0\0\0"){const r=`Error at offset=${this.tokenizer.position}: box.id=0`;m(r),this.addWarning(r);break}}catch(n){if(n instanceof Error){const r=`Error at offset=${this.tokenizer.position}: ${n.message}`;m(r),this.addWarning(r)}else throw n;break}const s=await A.readAtom(this.tokenizer,(n,r)=>this.handleAtom(n,r),null,e);e-=s.header.length===BigInt(0)?e:Number(s.header.length)}const t=[];this.tracks.forEach(s=>{const n=[];s.soundSampleDescription.forEach(r=>{const c={},d=F[r.dataFormat];if(d?(n.push(d.format),c.codecName=d.format):c.codecName=`<${r.dataFormat}>`,r.description){const{description:h}=r;h.sampleRate>0&&(c.type=H.audio,c.audio={samplingFrequency:h.sampleRate,bitDepth:h.sampleSize,channels:h.numAudioChannels})}this.metadata.addStreamInfo(c)}),n.length>=1&&t.push(n.join("/"))}),t.length>0&&this.metadata.setFormat("codec",t.filter(B).join("+"));const a=this.tracks.filter(s=>s.soundSampleDescription.length>=1&&s.soundSampleDescription[0].description&&s.soundSampleDescription[0].description.numAudioChannels>0);if(a.length>=1){const s=a[0];if(s.timeScale>0){const c=s.duration/s.timeScale;this.metadata.setFormat("duration",c)}const n=s.soundSampleDescription[0];if(n.description&&(this.metadata.setFormat("sampleRate",n.description.sampleRate),this.metadata.setFormat("bitsPerSample",n.description.sampleSize),this.metadata.setFormat("numberOfChannels",n.description.numAudioChannels),s.timeScale===0&&s.timeToSampleTable.length>0)){const d=s.timeToSampleTable.map(h=>h.count*h.duration).reduce((h,y)=>h+y)/n.description.sampleRate;this.metadata.setFormat("duration",d)}const r=F[n.dataFormat];r&&this.metadata.setFormat("lossless",!r.lossy),this.calculateBitRate()}}async handleAtom(e,t){if(e.parent)switch(e.parent.header.name){case"ilst":case"<id>":return this.parseMetadataItemData(e)}if(this.atomParsers[e.header.name])return this.atomParsers[e.header.name](t);m(`No parser for atom path=${e.atomPath}, payload-len=${t}, ignoring atom`),await this.tokenizer.ignore(t)}getTrackDescription(){return this.tracks[this.tracks.length-1]}calculateBitRate(){this.audioLengthInBytes&&this.metadata.format.duration&&this.metadata.setFormat("bitrate",8*this.audioLengthInBytes/this.metadata.format.duration)}async addTag(e,t){await this.metadata.addTag(de,e,t)}addWarning(e){m(`Warning: ${e}`),this.metadata.addWarning(e)}parseMetadataItemData(e){let t=e.header.name;return e.readAtoms(this.tokenizer,async(a,s)=>{const n=a.getPayloadLength(s);switch(a.header.name){case"data":return this.parseValueAtom(t,a);case"name":case"mean":case"rate":{const r=await this.tokenizer.readToken(new Z(n));t+=`:${r.name}`;break}default:{const r=await this.tokenizer.readToken(new I(n));this.addWarning(`Unsupported meta-item: ${t}[${a.header.name}] => value=${V(r)} ascii=${j(r,"ascii")}`)}}},e.getPayloadLength(0))}async parseValueAtom(e,t){const a=await this.tokenizer.readToken(new Y(Number(t.header.length)-C.len));if(a.type.set!==0)throw new T(`Unsupported type-set != 0: ${a.type.set}`);switch(a.type.type){case 0:switch(e){case"trkn":case"disk":{const s=g.get(a.value,3),n=g.get(a.value,5);await this.addTag(e,`${s}/${n}`);break}case"gnre":{const s=g.get(a.value,1),n=q[s-1];await this.addTag(e,n);break}case"rate":{const s=new TextDecoder("ascii").decode(a.value);await this.addTag(e,s);break}default:m(`unknown proprietary value type for: ${t.atomPath}`)}break;case 1:case 18:await this.addTag(e,new TextDecoder("utf-8").decode(a.value));break;case 13:if(this.options.skipCovers)break;await this.addTag(e,{format:"image/jpeg",data:Uint8Array.from(a.value)});break;case 14:if(this.options.skipCovers)break;await this.addTag(e,{format:"image/png",data:Uint8Array.from(a.value)});break;case 21:await this.addTag(e,z.read_BE_Integer(a.value,!0));break;case 22:await this.addTag(e,z.read_BE_Integer(a.value,!1));break;case 65:await this.addTag(e,g.get(a.value,0));break;case 66:await this.addTag(e,p.get(a.value,0));break;case 67:await this.addTag(e,o.get(a.value,0));break;default:this.addWarning(`atom key=${e}, has unknown well-known-type (data-type): ${a.type.type}`)}}parseSoundSampleDescription(e){const t={dataFormat:e.dataFormat,dataReferenceIndex:e.dataReferenceIndex};let a=0;const s=x.get(e.description,a);return a+=x.len,s.version===0||s.version===1?t.description=te.get(e.description,a):m(`Warning: sound-sample-description ${s} not implemented`),t}async parseChapterTrack(e,t,a){if(!e.sampleSize&&e.chunkOffsetTable.length!==e.sampleSizeTable.length)throw new Error("Expected equal chunk-offset-table & sample-size-table length.");const s=[];for(let n=0;n<e.chunkOffsetTable.length&&a>0;++n){const c=e.chunkOffsetTable[n]-this.tokenizer.position,d=e.sampleSize>0?e.sampleSize:e.sampleSizeTable[n];if(a-=c+d,a<0)throw new T("Chapter chunk exceeding token length");await this.tokenizer.ignore(c);const h=await this.tokenizer.readToken(new ce(d));m(`Chapter ${n+1}: ${h}`);const y={title:h,sampleOffset:this.findSampleOffset(t,this.tokenizer.position)};m(`Chapter title=${y.title}, offset=${y.sampleOffset}/${this.tracks[0].duration}`),s.push(y)}this.metadata.setFormat("chapters",s),await this.tokenizer.ignore(a)}findSampleOffset(e,t){let a=0;e.timeToSampleTable.forEach(n=>{a+=n.count*n.duration}),m(`Total duration=${a}`);let s=0;for(;s<e.chunkOffsetTable.length&&e.chunkOffsetTable[s]<t;)++s;return this.getChunkDuration(s+1,e)}getChunkDuration(e,t){let a=0,s=t.timeToSampleTable[a].count,n=t.timeToSampleTable[a].duration,r=1,c=this.getSamplesPerChunk(r,t.sampleToChunkTable),d=0;for(;r<e;){const h=Math.min(s,c);d+=h*n,s-=h,c-=h,c===0?(++r,c=this.getSamplesPerChunk(r,t.sampleToChunkTable)):(++a,s=t.timeToSampleTable[a].count,n=t.timeToSampleTable[a].duration)}return d}getSamplesPerChunk(e,t){for(let a=0;a<t.length-1;++a)if(e>=t[a].firstChunk&&e<t[a+1].firstChunk)return t[a].samplesPerChunk;return t[t.length-1].samplesPerChunk}}export{z as MP4Parser};
