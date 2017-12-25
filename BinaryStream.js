class BinaryStream {
    initVars(){
        /** @type {Buffer} */
        this.buffer = Buffer.alloc(0);
        /** @type {number} */
        this.offset = 0;
    }

    /**
     * @param buffer
     */
    constructor(buffer){
        this.initVars();

        if(buffer instanceof Buffer){
            this.append(buffer);
            this.offset = 0;
        }
    }

    reset(){
        this.buffer = Buffer.alloc(0);
        this.offset = 0;
    }

    setBuffer(buffer = Buffer.alloc(0), offset = 0){
        this.buffer = buffer;
        this.offset = offset;
    }

    getOffset(){
        return this.offset;
    }

    /**
     * @return {Buffer}
     */
    getBuffer(){
        return this.buffer;
    }

    get length(){
        return this.buffer.length;
    }

    /**
     * @return {number}
     */
    getRemainingBytes(){
        return this.buffer.length - this.offset;
    }

    /**
     * @return {Buffer}
     */
    getRemaining(){
        return this.buffer.slice((this.offset = this.buffer.length));
    }

    /**
     * Increases offset
     * @param v   {number}  Value to increase offset by
     * @param ret {boolean} Return the new offset
     * @return {number}
     */
    increaseOffset(v, ret = false){
        return (ret === true ? (this.offset += v) : (this.offset += v) - v);
    }

    /**
     * Append data to buffer
     * @param buf
     */
    append(buf){
        if(buf instanceof Buffer){
            this.buffer = Buffer.concat([this.buffer, buf]);
            this.offset += buf.length;
        }else if(typeof buf === "string"){
            buf = Buffer.from(buf, "hex");
            this.buffer = Buffer.concat([this.buffer, buf]);
            this.offset += buf.length;
        }
    }

    /**
     * Reads a 3-byte big-endian number
     * @return {number}
     */
    readTriad(){
        return this.buffer.readUIntBE(this.increaseOffset(3), 3);
    }

    /**
     * Writes a 3-byte big-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeTriad(v){
        let buf = Buffer.alloc(3);
        buf.writeUIntBE(v, 0, 3);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 3-byte little-endian number
     * @return {number}
     */
    readLTriad(){
        return this.buffer.readUIntLE(this.increaseOffset(3), 3);
    }

    /**
     * Writes a 3-byte little-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLTriad(v){
        let buf = Buffer.alloc(3);
        buf.writeUIntLE(v, 0, 3);
        this.append(buf);

        return this;
    }

    /**
     * Reads a byte boolean
     * @return {boolean}
     */
    readBool(){
        return this.readByte() !== 0;
    }

    /**
     * Writes a byte boolean
     * @param v {boolean}
     * @return {BinaryStream}
     */
    writeBool(v){
        this.writeByte(v === true ? 1 : 0);
        return this;
    }

    /**
     * Reads a unsigned/signed byte
     * @return {number}
     */
    readByte(){
        return this.getBuffer()[this.increaseOffset(1)];
    }

    /**
     * Writes a unsigned/signed byte
     * @param v {number}
     * @returns {BinaryStream}
     */
    writeByte(v){
        let buf = Buffer.from([v & 0xff]);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 16-bit unsigned or signed big-endian number
     * @return {number}
     */
    readShort(){
        return this.buffer.readUInt16BE(this.increaseOffset(2));
    }

    /**
     * Writes a 16-bit unsigned big-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeShort(v){
        let buf = Buffer.alloc(2);
        buf.writeUInt16BE(v);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 16-bit signed big-endian number
     * @return {number}
     */
    readSignedShort(){
        return this.buffer.readInt16BE(this.increaseOffset(2));
    }

    /**
     * Writes a 16-bit signed big-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeSignedShort(v){
        let buf = Buffer.alloc(2);
        buf.writeInt16BE(v);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 16-bit unsigned little-endian number
     * @return {number}
     */
    readLShort(){
        return this.buffer.readUInt16LE(this.increaseOffset(2));
    }

    /**
     * Writes a 16-bit unsigned little-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLShort(v){
        let buf = Buffer.alloc(2);
        buf.writeUInt16BE(v);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 16-bit signed little-endian number
     * @return {number}
     */
    readSignedLShort(){
        return this.buffer.readInt16LE(this.increaseOffset(2));
    }

    /**
     * Writes a 16-bit signed little-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeSignedLShort(v){
        let buf = Buffer.alloc(2);
        buf.writeInt16LE(v);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 32-bit signed big-endian number
     * @return {number}
     */
    readInt(){
        return this.buffer.readInt32BE(this.increaseOffset(4));
    }

    /**
     * Writes a 32-bit signed big-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeInt(v){
        let buf = Buffer.alloc(4);
        buf.writeInt32BE(v);
        this.append(buf);

        return this;
    }

    /**
     * Reads a 32-bit signed little-endian number
     * @return {number}
     */
    readLInt(){
        return this.buffer.readInt32LE(this.increaseOffset(4));
    }

    /**
     * Writes a 32-bit signed little-endian number
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLInt(v){
        let buf = Buffer.alloc(4);
        buf.writeInt32LE(v);
        this.append(buf);

        return this;
    }

    /**
     * @return {number}
     */
    readFloat(){
        return this.buffer.readFloatBE(this.increaseOffset(4));
    }

    /**
     * @param v {number}
     * @return {BinaryStream}
     */
    writeFloat(v) {
        let buf = Buffer.alloc(8); // bc you never know *shrug*
        let bytes = buf.writeFloatBE(v);
        this.append(buf.slice(0, bytes));

        return this;
    }

    /**
     * @return {number}
     */
    readLFloat(){
        return this.buffer.readFloatLE(this.increaseOffset(4));
    }

    /**
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLFloat(v){
        let buf = Buffer.alloc(8); // bc you never know *shrug*
        let bytes = buf.writeFloatLE(v);
        this.append(buf.slice(0, bytes));

        return this;
    }

    /**
     * @return {number}
     */
    readDouble(){
        return this.buffer.readDoubleBE(this.increaseOffset(8));
    }

    /**
     * @param v {number}
     * @return {BinaryStream}
     */
    writeDouble(v) {
        let buf = Buffer.alloc(8);
        buf.writeDoubleBE(v);
        this.append(buf);

        return this;
    }

    /**
     * @return {number}
     */
    readLDouble(){
        return this.buffer.readDoubleLE(this.increaseOffset(8));
    }

    /**
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLDouble(v){
        let buf = Buffer.alloc(8);
        buf.writeDoubleLE(v);
        this.append(buf);

        return this;
    }

    /**
     * @return {number}
     */
    readLong(){
        return (this.buffer.readUInt32BE(this.increaseOffset(4)) << 8) + this.buffer.readUInt32BE(this.increaseOffset(4));
    }

    /**
     * @param v {number}
     * @return {BinaryStream}
     */
    writeLong(v){
        let MAX_UINT32 = 0xFFFFFFFF;

        let buf = Buffer.alloc(8);
        buf.writeUInt32BE((~~(v / MAX_UINT32)), 0);
        buf.writeUInt32BE((v & MAX_UINT32), 4);
        this.append(buf);

        return this;
    }

    /**
     * Found end of buffer
     * @return {boolean}
     */
    feof(){
        return typeof this.getBuffer()[this.offset] === "undefined";
    }

    /**
     * Reads address from buffer
     * @return {{ip: string, port: number, version: number}}
     */
    readAddress(){
        let addr, port;
        let version = this.readByte();
        switch(version){
            default:
            case 4:
                addr = [];
                for(let i = 0; i < 4; i++){
                    addr.push(this.readByte() & 0xff);
                }
                addr = addr.join(".");
                port = this.readShort();
                break;
            // add ipv6 support
        }
        return {ip: addr, port: port, version: version};
    }

    /**
     * Writes address to buffer
     * @param addr    {string}
     * @param port    {number}
     * @param version {number}
     * @return {BinaryStream}
     */
    writeAddress(addr, port, version = 4){
        this.writeByte(version);
        switch(version){
            default:
            case 4:
                addr.split(".", 4).forEach(b => {
                    this.writeByte((Number(b)) & 0xff);
                });
                this.writeShort(port);
                break;
        }
        return this;
    }

    writeString(v, encoding = "utf8"){
        let buf = Buffer.alloc(v.length);
        buf.write(v, 0, v.length, encoding);
        this.append(buf);
        return this;
    }

    flip(){
        this.offset = 0;
        return this;
    }


}

module.exports = BinaryStream;