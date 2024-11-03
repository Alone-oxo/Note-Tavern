import{f as l,F as u,k as D,d as I,c as f,m as z,B,J as w,N as S,a as m,u as x}from"./index-ASeBwoxR.js";import"./index-C1xIFlgX.js";/* empty css                    *//* empty css                        *//* empty css                  *//* empty css               */import"./index-XZ15LRdO.js";const P=[6e3,8e3,9600,11025,12e3,16e3,22050,24e3,32e3,44100,48e3,64e3,88200,96e3,192e3,-1],c={len:32,get:(e,t)=>{const a=l.get(e,t+24),i={BlockID:u.get(e,t),blockSize:l.get(e,t+4),version:D.get(e,t+8),totalSamples:l.get(e,t+12),blockIndex:l.get(e,t+16),blockSamples:l.get(e,t+20),flags:{bitsPerSample:(1+d(a,0,2))*8,isMono:s(a,2),isHybrid:s(a,3),isJointStereo:s(a,4),crossChannel:s(a,5),hybridNoiseShaping:s(a,6),floatingPoint:s(a,7),samplingRate:P[d(a,23,4)],isDSD:s(a,31)},crc:new I(4).get(e,t+28)};return i.flags.isDSD&&(i.totalSamples*=8),i}},k={len:1,get:(e,t)=>({functionId:d(e[t],0,6),isOptional:s(e[t],5),isOddSize:s(e[t],6),largeBlock:s(e[t],7)})};function s(e,t){return d(e,t,1)===1}function d(e,t,a){return e>>>t&4294967295>>>32-a}const o=f("music-metadata:parser:WavPack");class g extends z("WavPack"){}class M extends B{constructor(){super(...arguments),this.audioDataSize=0}async parse(){return this.audioDataSize=0,await this.parseWavPackBlocks(),w.tryParseApeHeader(this.metadata,this.tokenizer,this.options)}async parseWavPackBlocks(){do{if(await this.tokenizer.peekToken(u)!=="wvpk")break;const a=await this.tokenizer.readToken(c);if(a.BlockID!=="wvpk")throw new g("Invalid WavPack Block-ID");o(`WavPack header blockIndex=${a.blockIndex}, len=${c.len}`),a.blockIndex===0&&!this.metadata.format.container&&(this.metadata.setFormat("container","WavPack"),this.metadata.setFormat("lossless",!a.flags.isHybrid),this.metadata.setFormat("bitsPerSample",a.flags.bitsPerSample),a.flags.isDSD||(this.metadata.setFormat("sampleRate",a.flags.samplingRate),this.metadata.setFormat("duration",a.totalSamples/a.flags.samplingRate)),this.metadata.setFormat("numberOfChannels",a.flags.isMono?1:2),this.metadata.setFormat("numberOfSamples",a.totalSamples),this.metadata.setFormat("codec",a.flags.isDSD?"DSD":"PCM"));const i=a.blockSize-(c.len-8);await(a.blockIndex===0?this.parseMetadataSubBlock(a,i):this.tokenizer.ignore(i)),a.blockSamples>0&&(this.audioDataSize+=a.blockSize)}while(!this.tokenizer.fileInfo.size||this.tokenizer.fileInfo.size-this.tokenizer.position>=c.len);this.metadata.format.duration&&this.metadata.setFormat("bitrate",this.audioDataSize*8/this.metadata.format.duration)}async parseMetadataSubBlock(t,a){let i=a;for(;i>k.len;){const n=await this.tokenizer.readToken(k),h=await this.tokenizer.readNumber(n.largeBlock?S:m),r=new Uint8Array(h*2-(n.isOddSize?1:0));switch(await this.tokenizer.readBuffer(r),o(`Metadata Sub-Blocks functionId=0x${n.functionId.toString(16)}, id.largeBlock=${n.largeBlock},data-size=${r.length}`),n.functionId){case 0:break;case 14:{o("ID_DSD_BLOCK");const b=1<<m.get(r,0),p=t.flags.samplingRate*b*8;if(!t.flags.isDSD)throw new g("Only expect DSD block if DSD-flag is set");this.metadata.setFormat("sampleRate",p),this.metadata.setFormat("duration",t.totalSamples/p);break}case 36:o("ID_ALT_TRAILER: trailer for non-wav files");break;case 38:this.metadata.setFormat("audioMD5",r);break;case 47:o(`ID_BLOCK_CHECKSUM: checksum=${x(r)}`);break;default:o(`Ignore unsupported meta-sub-block-id functionId=0x${n.functionId.toString(16)}`);break}i-=k.len+(n.largeBlock?S.len:m.len)+h*2,o(`remainingLength=${i}`),n.isOddSize&&this.tokenizer.ignore(1)}if(i!==0)throw new g("metadata-sub-block should fit it remaining length")}}export{g as WavPackContentError,M as WavPackParser};