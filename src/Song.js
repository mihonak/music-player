/**
 * Song クラス
 */
export class Song {

    /**
     * @param {string} title 曲のタイトル
     * @param {string} [artist=Unknown Artist] アーティスト名
     * @param {?number} [id=null] ShuffleEngineで利用するid
     */
    constructor (title, artist="Unknown Artist", id=null) {

        this.title = title;
        this.artist = artist;
        this.id = id;
    }
}