# Vue dialog hook

原文: [用 Vue3 實做一個簡單的 modal hook 吧](https://github.com/HelloJunWei/blog/issues/11)的原始碼。


## 最直覺的做法
<img width="400" alt="image" src="https://user-images.githubusercontent.com/18310281/184474363-3463ae85-b245-414d-bcec-f9a11ee9160d.png">


上圖是我們很直覺會在vue使用 dialog 的方式，但我始終覺得不是很好維護以及擴充，所以這個 hook 可以從上方呼叫的方式變成這樣:

<img width="400" alt="image" src="https://user-images.githubusercontent.com/18310281/184474427-09dfb767-b558-425a-99a7-8479e8be0e9a.png">


---

並且利用 Typescript 簡化參數的方式，讓他可以去簡單地找到到底有哪一些 dialog 以及該 dialog 有什麼 props.

https://user-images.githubusercontent.com/18310281/184474798-960b6e66-f51c-4dfc-a0fb-ee6c40f9678c.mov

