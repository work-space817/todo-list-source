(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const n of t.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && o(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function o(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = l(e);
    fetch(e.href, t);
  }
})();
class u {
  constructor(s) {
    (this.text = s), (this.isCompleted = !1);
  }
}
class a {
  constructor(s, l) {
    (this.text = s),
      (this.importance = l),
      this.alert(this.text, this.importance);
  }
  alert(s, l) {
    const o = document.createElement("div"),
      e = document.createElement("p");
    switch (
      ((e.className = "message"),
      (e.innerText = s),
      o.appendChild(e),
      (o.className = "alert"),
      l)
    ) {
      case "error":
        o.style.backgroundColor = "#e25858";
        break;
      case "sucsses":
        o.style.backgroundColor = "#228636";
        break;
      case "remove":
        o.style.backgroundColor = "#caae21";
      case "completed":
        o.style.backgroundColor = "#1199e3";
        break;
    }
    document.body.appendChild(o),
      setTimeout(() => {
        o.classList.add("active");
      }),
      setTimeout(() => {
        o.classList.toggle("active");
      }, 3e3),
      setTimeout(() => {
        o.remove();
      }, 5e3);
  }
}
class h {
  constructor(s) {
    (this.todos = [{ text: "Ghbdsn!", isCompleted: !1 }]),
      (this.completed = []),
      (this.selectedHtmlElement = s || document.querySelector("#app")),
      this.render(this.todos);
  }
  render(s) {
    (this.selectedHtmlElement.innerHTML = ""),
      this.layout(),
      this.addListWithToDo(s);
  }
  addToDoToList(s) {
    console.log("addToDoToList", s),
      s == "" || s == null
        ? new a("The field cannot be empty", "error")
        : (this.todos.push(new u(s)), new a("Your addind new todo", "sucsses")),
      this.render(this.todos);
  }
  addListWithToDo(s) {
    const l = document.createElement("ul");
    (l.className = "todo_list"),
      s.forEach((o, e) => {
        const t = document.createElement("li"),
          n = document.createElement("input"),
          c = document.createElement("label"),
          i = document.createElement("span");
        (i.className = "check_box"),
          (n.type = "checkbox"),
          (n.className = "check_input"),
          (t.innerText = o.text),
          (t.className = "todo_item"),
          (n.checked = o.isCompleted),
          o.isCompleted
            ? t.classList.add("completed")
            : t.classList.remove("completed"),
          c.appendChild(n),
          c.appendChild(i),
          t.insertAdjacentElement("afterbegin", c);
        const r = document.createElement("div");
        (r.classList = "trash"),
          r.addEventListener("click", () => {
            l.removeChild(t),
              (this.todos = this.todos
                .slice(0, e)
                .concat(this.todos.slice(e + 1, this.todos.length))),
              this.render(this.todos),
              new a("Todo remove", "remove");
          });
        const m = (p) => {
          console.log("first"),
            o.isCompleted
              ? ((o.isCompleted = !1),
                p.target.classList.remove("completed"),
                (n.checked = !1),
                (this.todos[e].completed = !1))
              : (new a("todo is completed", "completed"),
                p.target.classList.add("completed"),
                (o.isCompleted = !0),
                (n.checked = !0));
        };
        i.addEventListener("click", m),
          t.addEventListener("click", m),
          t.appendChild(r),
          l.appendChild(t);
      }),
      this.selectedHtmlElement.querySelector(".main").appendChild(l);
  }
  layout() {
    const s = document.createElement("header");
    s.className = "header";
    const l = document.createElement("img");
    (l.src = "../img/logo.svg"), (l.alt = "logo"), s.appendChild(l);
    const o = document.createElement("div");
    (o.className = "input_wrapper"), s.appendChild(o);
    const e = document.createElement("input");
    (e.className = "input"),
      (e.type = "text"),
      (e.placeholder = "Add a new task");
    const t = document.createElement("button");
    (t.className = "button"), (t.innerText = "Create");
    const n = document.createElement("img");
    (n.src = "../img/plus.svg"),
      (n.alt = "plus"),
      t.appendChild(n),
      o.appendChild(e),
      o.appendChild(t),
      t.addEventListener("click", () => {
        this.addToDoToList(e.value), (e.value = "");
      }),
      e.addEventListener("keypress", (i) => {
        i.key === "Enter" && (this.addToDoToList(e.value), (e.value = ""));
      });
    const c = document.createElement("main");
    (c.className = "main"),
      this.selectedHtmlElement.appendChild(s),
      this.selectedHtmlElement.appendChild(c);
  }
}
new h();
