/**
 * ShuffleEngine クラス
 */
export class ShuffleEngine {

    /**
     * @property {number} PEEK_MAX 先読みする上限値
     */
    static PEEK_MAX = 5;

    constructor () {

        /**
         * @property {Array} songs セットされた曲の配列
         */
        this.songs = [];

        /**
         * @property {Array} generatedPlaylist 再生待ちの曲の配列
         */
        this.generatedPlaylist = [];

        /**
         * @property {Array} waitingSongs 再生待ちの曲の配列を生成する際に使用する仮の配列
         */
        this.waitingSongs = [[],[]];

        /**
         * @property {boolean} isFirstRound 1巡目の再生時はtrue、2巡目以降はfalse
         */
        this.isFirstRound = true;
    }

    /**
     * @property {Function} setSongs シャッフル対象の曲の配列をインスタンスに設定する
     * @returns {void}
     */
    setSongs(songs) {
        try {
            if ( ! Array.isArray(songs)) {
                throw new Error("setSongsの引数の型が不正です。配列を渡してください。");
            } else if (songs.length === 0) {
                throw new Error("setSongsに渡す引数の配列が空です。");
            }
            this.songs = songs.map((song, index) => ({
                id: index+1,
                title: song.title,
                artist: song.artist,
            }));
            this.waitingSongs = [[],[]];
            this.generatePlaylist();
        } catch(e){
            console.error(e);
            throw e;
        }
    }

    /**
     * @property {Function} - 次に再生する曲を返す。次に返す曲が更新される
     * @returns {Object} - 次に再生する曲
     */
    getNextSong() {
        // 1巡再生し終わったら、曲順の比較のために次のリストを生成する
        // （generatePlaylistは2巡分シャッフルしたリストを生成するので、残りの曲が1巡分になった時が1巡再生終了のタイミング）
        if (this.generatedPlaylist.length === this.songs.length){
            this.generatePlaylist();
            if (this.isFirstRound === true) {
                this.isFirstRound = false;
            }
        }
        const next_song = this.generatedPlaylist[0];

        // 再生待ちの曲の配列を更新する
        this.generatedPlaylist.splice(0,1);

        return next_song;
    }

    /**
     * @property {Function} - この後再生する予定の曲を返す
     * @returns {Array} - PEEK_MAXの長さの配列
     */
    peekQueue() {
        return [...Array(this.constructor.PEEK_MAX).keys()].map((v)=>this.generatedPlaylist[v]);
    }

    /**
     * @property {Function} - セットされた曲の順番をランダムにシャッフルしたリストを生成する
     * @returns {Array} - シャッフルされた曲のリスト
     */
    shuffleSongs() {
        const orgOrder = this.songs.map((song) => song.id);
        const shuffledOrder = [...orgOrder];
        // 元の曲順と同じだった場合、または
        // 1巡目の1曲目が、セットした曲の1番目の曲になった場合はシャッフルをやり直す
        while (
            (JSON.stringify(shuffledOrder) === JSON.stringify(orgOrder)) ||
            (this.isFirstRound && shuffledOrder[0] === orgOrder[0])
        ){
            for (let i = shuffledOrder.length - 1; i >= 0; i--) {
                let random_num = Math.floor(Math.random() * (i + 1));
                let tmp = shuffledOrder[i];
                shuffledOrder[i] = shuffledOrder[random_num];
                shuffledOrder[random_num] = tmp;
              }
        }
        return [...this.songs].sort((x, y) => shuffledOrder.indexOf(x.id) - shuffledOrder.indexOf(y.id));
    }

    /**
     * @property {Function} - シャッフルしたプレイリストを生成してgeneratedPlaylistを更新する(同じ曲順で繰り返されることを防ぐために2巡分のリストを生成しています)
     * @returns {void}
     */
    generatePlaylist() {

        // セットされた曲数が1曲しかなかった場合は、その曲を繰り返し再生する
        if (this.songs.length === 1) {
            this.waitingSongs[0] = [...this.songs];
            this.waitingSongs[1] = [...this.songs];

        // セットされた曲数が2曲しかなかった場合は、開始曲をランダムに決定した上で交互に再生する
        } else if (this.songs.length === 2) {
            if (this.waitingSongs[0].length === 0) {
                if (Math.floor(Math.random() * 2) === 0) {
                    this.waitingSongs[0] = [...this.songs];
                    this.waitingSongs[1] = [...this.songs];
                } else {
                    this.waitingSongs[0] = [...this.songs].reverse();
                    this.waitingSongs[1] = [...this.songs].reverse();
                }
            } else {
                if (this.waitingSongs[0][0].id === 1) {
                    this.waitingSongs[0] = [...this.songs];
                    this.waitingSongs[1] = [...this.songs];
                } else {
                    this.waitingSongs[0] = [...this.songs].reverse();
                    this.waitingSongs[1] = [...this.songs].reverse();
                }
            }

        // セットされた曲数が3曲以上だった場合は、シャッフルを行う
        } else {
            if (this.waitingSongs[0].length === 0) {
                this.waitingSongs[0] = this.shuffleSongs();
            }else {
                this.waitingSongs[0] = [...this.waitingSongs[1]];
            }
            this.waitingSongs[1] = this.shuffleSongs();
    
            // n巡目の最後の曲とn+1巡目の最初の曲が同じになった場合、または
            // n巡目とn+1巡目の曲順が全く同じだった場合はシャッフルをやり直す
            while (
                (this.waitingSongs[0].slice(-1)[0].id === this.waitingSongs[1][0].id) ||
                (JSON.stringify(this.waitingSongs[0].map((song) => song.id)) === JSON.stringify(this.waitingSongs[1].map((song) => song.id)))
            ){
                this.waitingSongs[1] = this.shuffleSongs();
            }
        }
        this.generatedPlaylist = [...this.waitingSongs[0],...this.waitingSongs[1]];
    }
}
