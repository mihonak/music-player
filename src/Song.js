/**
 * Song クラス
 */
export class Song {
    constructor (title, artist='Unknown Artist') {

        /**
         * @property {string} title 曲のタイトル
         */
        this.title = String(title);

        /**
         * @property {string} artist アーティスト名
         */
        this.artist = String(artist);

    }
}