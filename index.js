//HTML要素をJavaScriptで参照するための変数を宣言
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));   //JSONで元の配列に戻して取得

if (todos) {                     //前回のデータを復元
    todos.forEach(todo => {
        add(todo);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();     //フォームに入力してエンターを押すとリロードされるのを防ぐ
    add();
});   //addEventListnerはイベント名と関数の2つを引数に取り、イベントが実行された時に関数を実行

function add(todo) {
    let todoText = input.value;                   //input.valueはformに入力された値(エンター押してなくてもフォーム入っているだけでアクセス可能)

    if (todo) {                 //データ復元用
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");  //liタグの作成(addが呼ばれるたびに毎回新しい<li>要素を生成)
        li.innerText = todoText;                  //入力フィールドに入力された値を<li>要素のテキスト(innerText)として設定
        li.classList.add("list-group-item");      //Bootstrapのクラスを<li>要素に追加してリストグループのスタイルを適用(HTMLのclass="~"と同じ役割)

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        })

        li.addEventListener("click", function () {
            li.classList.toggle("text-decoration-line-through");   //toggleは切り替え
            saveData();
        })

        ul.appendChild(li);                       //新しい<li>要素をリストに追加(ulタグはhtmlに書いてるので常に表示)
        input.value = "";                         //入力フォームをクリア
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));     //毎回キーtodosの中身を上書き(JSON形式の文字列に変換)

}