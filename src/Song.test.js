import { Song } from "./Song";

describe("Song クラス", () => {

    test("Songが存在すること", () => {
        expect(Song).toBeDefined();
    });

    test("Songにはタイトルとアーティスト名が格納されること", () => {
        expect(new Song("Carnival", "The Cardigans")).toEqual({
            "title":"Carnival",
            "artist":"The Cardigans"
        });
    });

    test("タイトルやアーティスト名が数字であっても文字列として格納すること", () => {
        expect(new Song(22,"Taylor Swift")).toEqual({
            "title": "22",
            "artist": "Taylor Swift",
        });
        expect(new Song("あの紙ヒコーキ　くもり空わって",19)).toEqual({
            "title": "あの紙ヒコーキ　くもり空わって",
            "artist": "19",
        });
    });

    test("アーティスト名がセットされていない場合はアーティスト名にUnknown Artistをセットすること", () => {
        expect(new Song("Problem(feat. Iggy Azalea)")).toEqual({
            "title": "Problem(feat. Iggy Azalea)",
            "artist": "Unknown Artist",
        });
    });

});