import{c as N,m as W,O as M,e as h,P as f,a as O,U as w,Q as v,R as C,A as U,H as j,l as u,K as z,V as H,d as P,W as X,r as R}from"./index-ASeBwoxR.js";const S=N("music-metadata:id3v2:frame-parser"),p="latin1";function F(m){const e=[];let t,a="";for(const i of m)if(typeof t=="string")if(i==="("&&t==="")a+="(",t=void 0;else if(i===")"){a!==""&&(e.push(a),a="");const l=b(t);l&&e.push(l),t=void 0}else t+=i;else i==="("?t="":a+=i;return a&&(e.length===0&&a.match(/^\d*$/)&&(a=b(a)),a&&e.push(a)),e}function b(m){if(m==="RX")return"Remix";if(m==="CR")return"Cover";if(m.match(/^\d*$/))return j[Number.parseInt(m)]}class g{constructor(e,t){this.major=e,this.warningCollector=t}readData(e,t,a){if(e.length===0){this.warningCollector.addWarning(`id3v2.${this.major} header has empty tag type=${t}`);return}const{encoding:i,bom:l}=M.get(e,0),d=e.length;let s=0,c=[];const E=g.getNullTerminatorLength(i);let r;switch(S(`Parsing tag type=${t}, encoding=${i}, bom=${l}`),t!=="TXXX"&&t[0]==="T"?"T*":t){case"T*":case"GRP1":case"IPLS":case"MVIN":case"MVNM":case"PCS":case"PCST":{let n;try{n=h(e.slice(1),i).replace(/\x00+$/,"")}catch(o){if(o instanceof Error){this.warningCollector.addWarning(`id3v2.${this.major} type=${t} header has invalid string value: ${o.message}`);break}throw o}switch(t){case"TMCL":case"TIPL":case"IPLS":c=g.functionList(this.splitValue(t,n));break;case"TRK":case"TRCK":case"TPOS":c=n;break;case"TCOM":case"TEXT":case"TOLY":case"TOPE":case"TPE1":case"TSRC":c=this.splitValue(t,n);break;case"TCO":case"TCON":c=this.splitValue(t,n).map(o=>F(o)).reduce((o,T)=>o.concat(T),[]);break;case"PCS":case"PCST":c=this.major>=4?this.splitValue(t,n):[n],c=Array.isArray(c)&&c[0]===""?1:0;break;default:c=this.major>=4?this.splitValue(t,n):[n]}break}case"TXXX":{const n=g.readIdentifierAndData(e,s+1,d,i);c={description:n.id,text:this.splitValue(t,h(n.data,i).replace(/\x00+$/,""))};break}case"PIC":case"APIC":if(a){const n={};switch(s+=1,this.major){case 2:n.format=h(e.slice(s,s+3),"latin1"),s+=3;break;case 3:case 4:r=f(e,s,d,p),n.format=h(e.slice(s,r),p),s=r+1;break;default:throw V(this.major)}n.format=g.fixPictureMimeType(n.format),n.type=U[e[s]],s+=1,r=f(e,s,d,i),n.description=h(e.slice(s,r),i),s=r+E,n.data=e.slice(s,d),c=n}break;case"CNT":case"PCNT":c=w.get(e,0);break;case"SYLT":{const n=C.get(e,0);s+=C.len;const o={descriptor:"",language:n.language,contentType:n.contentType,timeStampFormat:n.timeStampFormat,syncText:[]};let T=!1;for(;s<d;){const x=g.readNullTerminatedString(e.subarray(s),n.encoding);if(s+=x.len,T){const L=w.get(e,s);s+=w.len,o.syncText.push({text:x.text,timestamp:L})}else o.descriptor=x.text,T=!0}c=o;break}case"ULT":case"USLT":case"COM":case"COMM":{const n=v.get(e,s);s+=v.len;const o=g.readNullTerminatedString(e.subarray(s),n.encoding);s+=o.len;const T=g.readNullTerminatedString(e.subarray(s),n.encoding);c={language:n.language,descriptor:o.text,text:T.text};break}case"UFID":{const n=g.readIdentifierAndData(e,s,d,p);c={owner_identifier:n.id,identifier:n.data};break}case"PRIV":{const n=g.readIdentifierAndData(e,s,d,p);c={owner_identifier:n.id,data:n.data};break}case"POPM":{r=f(e,s,d,p);const n=h(e.slice(s,r),p);s=r+1;const o=d-s;c={email:n,rating:O.get(e,s),counter:o>=5?w.get(e,s+1):void 0};break}case"GEOB":{r=f(e,s+1,d,i);const n=h(e.slice(s+1,r),p);s=r+1,r=f(e,s,d-s,i);const o=h(e.slice(s,r),p);s=r+1,r=f(e,s,d-s,i);const T=h(e.slice(s,r),p);c={type:n,filename:o,description:T,data:e.slice(s+1,d)};break}case"WCOM":case"WCOP":case"WOAF":case"WOAR":case"WOAS":case"WORS":case"WPAY":case"WPUB":r=f(e,s+1,d,i),c=h(e.slice(s,r),p);break;case"WXXX":{r=f(e,s+1,d,i);const n=h(e.slice(s+1,r),i);s=r+(i==="utf-16le"?2:1),c={description:n,url:h(e.slice(s,d),p)};break}case"WFD":case"WFED":c=h(e.slice(s+1,f(e,s+1,d,i)),i);break;case"MCDI":{c=e.slice(0,d);break}default:S(`Warning: unsupported id3v2-tag-type: ${t}`);break}return c}static readNullTerminatedString(e,t){let a=t.bom?2:0;const i=f(e,a,e.length,t.encoding),l=e.slice(a,i);return t.encoding==="utf-16le"?a=i+2:a=i+1,{text:h(l,t.encoding),len:a}}static fixPictureMimeType(e){switch(e=e.toLocaleLowerCase(),e){case"jpg":return"image/jpeg";case"png":return"image/png"}return e}static functionList(e){const t={};for(let a=0;a+1<e.length;a+=2){const i=e[a+1].split(",");t[e[a]]=t[e[a]]?t[e[a]].concat(i):i}return t}splitValue(e,t){let a;return this.major<4?(a=t.split(/\x00/g),a.length>1?this.warningCollector.addWarning(`ID3v2.${this.major} ${e} uses non standard null-separator.`):a=t.split(/\//g)):a=t.split(/\x00/g),g.trimArray(a)}static trimArray(e){return e.map(t=>t.replace(/\x00+$/,"").trim())}static readIdentifierAndData(e,t,a,i){const l=f(e,t,a,i),d=h(e.slice(t,l),i);return t=l+g.getNullTerminatorLength(i),{id:d,data:e.slice(t,a)}}static getNullTerminatorLength(e){return e==="utf-16le"?2:1}}class D extends W("id3v2"){}function V(m){throw new D(`Unexpected majorVer: ${m}`)}const $=new TextDecoder("ascii");class k{constructor(){this.tokenizer=void 0,this.id3Header=void 0,this.metadata=void 0,this.headerType=void 0,this.options=void 0}static removeUnsyncBytes(e){let t=0,a=0;for(;t<e.length-1;)t!==a&&(e[a]=e[t]),t+=e[t]===255&&e[t+1]===0?2:1,a++;return t<e.length&&(e[a++]=e[t]),e.slice(0,a)}static getFrameHeaderLength(e){switch(e){case 2:return 6;case 3:case 4:return 10;default:throw I(e)}}static readFrameFlags(e){return{status:{tag_alter_preservation:u(e,0,6),file_alter_preservation:u(e,0,5),read_only:u(e,0,4)},format:{grouping_identity:u(e,1,7),compression:u(e,1,3),encryption:u(e,1,2),unsynchronisation:u(e,1,1),data_length_indicator:u(e,1,0)}}}static readFrameData(e,t,a,i,l){var s,c;const d=new g(a,l);switch(a){case 2:return d.readData(e,t.id,i);case 3:case 4:return(s=t.flags)!=null&&s.format.unsynchronisation&&(e=k.removeUnsyncBytes(e)),(c=t.flags)!=null&&c.format.data_length_indicator&&(e=e.slice(4,e.length)),d.readData(e,t.id,i);default:throw I(a)}}static makeDescriptionTagName(e,t){return e+(t?`:${t}`:"")}async parse(e,t,a){this.tokenizer=t,this.metadata=e,this.options=a;const i=await this.tokenizer.readToken(z);if(i.fileIdentifier!=="ID3")throw new D("expected ID3-header file-identifier 'ID3' was not found");return this.id3Header=i,this.headerType=`ID3v2.${i.version.major}`,i.flags.isExtendedHeader?this.parseExtendedHeader():this.parseId3Data(i.size)}async parseExtendedHeader(){const e=await this.tokenizer.readToken(H),t=e.size-H.len;return t>0?this.parseExtendedHeaderData(t,e.size):this.parseId3Data(this.id3Header.size-e.size)}async parseExtendedHeaderData(e,t){return await this.tokenizer.ignore(e),this.parseId3Data(this.id3Header.size-t)}async parseId3Data(e){const t=await this.tokenizer.readToken(new P(e));for(const a of this.parseMetadata(t))switch(a.id){case"TXXX":a.value&&await this.handleTag(a,a.value.text,()=>a.value.description);break;default:await(Array.isArray(a.value)?Promise.all(a.value.map(i=>this.addTag(a.id,i))):this.addTag(a.id,a.value))}}async handleTag(e,t,a,i=l=>l){await Promise.all(t.map(l=>this.addTag(k.makeDescriptionTagName(e.id,a(l)),i(l))))}async addTag(e,t){await this.metadata.addTag(this.headerType,e,t)}parseMetadata(e){let t=0;const a=[];for(;t!==e.length;){const i=k.getFrameHeaderLength(this.id3Header.version.major);if(t+i>e.length){this.metadata.addWarning("Illegal ID3v2 tag length");break}const l=e.slice(t,t+i);t+=i;const d=this.readFrameHeader(l,this.id3Header.version.major),s=e.slice(t,t+d.length);t+=d.length;const c=k.readFrameData(s,d,this.id3Header.version.major,!this.options.skipCovers,this.metadata);c&&a.push({id:d.id,value:c})}return a}readFrameHeader(e,t){let a;switch(t){case 2:a={id:$.decode(e.slice(0,3)),length:R.get(e,3)},a.id.match(/[A-Z0-9]{3}/g)||this.metadata.addWarning(`Invalid ID3v2.${this.id3Header.version.major} frame-header-ID: ${a.id}`);break;case 3:case 4:a={id:$.decode(e.slice(0,4)),length:(t===4?X:w).get(e,4),flags:k.readFrameFlags(e.slice(8,10))},a.id.match(/[A-Z0-9]{4}/g)||this.metadata.addWarning(`Invalid ID3v2.${this.id3Header.version.major} frame-header-ID: ${a.id}`);break;default:throw I(t)}return a}}function I(m){throw new D(`Unexpected majorVer: ${m}`)}export{k as I};