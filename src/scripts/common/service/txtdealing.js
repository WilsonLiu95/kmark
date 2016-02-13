/**
 * Created by WilsonLiu on 2016/2/11.
 */
app.factory("deal", function () {
    var fac = {};
    fac.splitPiece = function (txt) {
        var splitPiece = /==========/g; //根据mycliping的格式先划分成一大块一大块
        if (txt) {
            return txt.split(splitPiece); //切块后的数组
        } else {
            alert("没有读取到文件，请重试");
        }
    };
    fac.pieceDivide = function (pieceArray) {  //输入切分的数组
        var pieceDivide = /^(.*) \((.*)\).*(?:\s+)(.*)(?:\s+)(.*)/m; //将每一块细分为书名，作者，内容
        var notes = [];
        for (var i = 0, len = pieceArray.length - 1; i < len; i++) {  //split这个函数会切多出来一个，所以要减一
            var cache = pieceArray[i].match(pieceDivide);
            notes[i] = {
                bookName: cache[1],
                author: cache[2],
                fragment: cache[4]
            };
        }
        return notes;
    };
    fac.uniqueBook = function (arr) {
        // 遍历arr，把元素分别放入tmp数组(不存在才放)
        var tmp = [];
        for (var i in arr) {
            //该元素在tmp内部不存在才允许追加
            if (tmp.indexOf(arr[i].bookName) == -1) { //根据数组的title值来确定
                tmp.push(arr[i].bookName);
            }
        }
        return tmp; //输出应为书籍名数组
    };
    fac.ruleNotes = function (bookList, notes) {
        var ruleNotes = [];
        for (var i = 0; i < bookList.length; i++) {
            ruleNotes[i] = {
                fragments: []
            };
            ruleNotes[i].bookName = bookList[i];  //制造新的规则数组
            for (var j = 0, len = notes.length; j < len; j++) {
                if (ruleNotes[i].bookName === notes[j].bookName) {
                    if (!ruleNotes[i].author) {
                        ruleNotes[i].author = notes[j].author;
                    }
                    ruleNotes[i].fragments.push(notes[j].fragment);
                }
            }
        }
        return ruleNotes;
    };
    fac.pipeline = function (file) {  //大必杀 一招就ok
        var cache = {};
        cache.notesList = fac.splitPiece(file);
        cache.piecesList = fac.pieceDivide(cache.notesList);
        cache.bookList = fac.uniqueBook(cache.piecesList);
        cache.result = fac.ruleNotes(cache.bookList, cache.piecesList);
        return cache.result;
    };
    return fac;

});