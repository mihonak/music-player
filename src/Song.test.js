import { Song } from "./Song";

describe("Song クラス", () => {

    test("Songが存在すること", () => {
        expect(Song).toBeDefined();
    });

    test("Songにはタイトルとアーティスト名、及びIDが格納されること", () => {
        expect(new Song("Carnival", "The Cardigans", 1)).toEqual({
            "id":1,
            "title":"Carnival",
            "artist":"The Cardigans",
        });
    });

    test("IDがセットされていない場合は、IDはnullのまま格納されること", () => {
        expect(new Song("Carnival", "The Cardigans")).toEqual({
            "id":null,
            "title":"Carnival",
            "artist":"The Cardigans",
        });
    });

    test("アーティスト名がセットされていない場合はアーティスト名にUnknown Artistをセットすること", () => {
        expect(new Song("Problem(feat. Iggy Azalea)")).toEqual({
            "id":null,
            "title": "Problem(feat. Iggy Azalea)",
            "artist": "Unknown Artist",
        });
    });

});