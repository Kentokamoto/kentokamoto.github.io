---
layout: post
title: Rust Update
header: Rust Update
tags: Rust
---

I was writing up a draft for chapter 4 a while ago but recently got assigned to
work on a small project for a company to draft up in Rust. It called for
implementing a digital signature proof of concept where the payload I send to
the server has to be verified that it indeed came from said user. Being a novice
at writing in the language, I stumbled quite a bit to get things up and running
at first but got the ball rolling once the infrastructure was put in place.

There came a point while I was coding up the project where I had started to
really understand the concepts better than when I was just reading through the
book. Projects are what really solidify my understanding of the language and if
I really needed to go back and read the book, it will be there. It honestly
might be better for understanding a specific concept that I may have struggled
with when I first read the book. Another thing that became apparent is that
different crates will require you to work a little differently compared to what
you might do in plain Rust. An example of this was when I was working in the
Rocket crate to build a backend endpoint for my project. I'm sure this same
logic applies to other crates like [Bevy](https://bevyengine.org/) (graphics),
[Leptos](https://www.leptos.dev/) (Frontend Web), [Tokio](https://tokio.rs/)
(Async), and so many more. The fundamental rules will always be there.

Like a lot of people generally recommend, "at some point, it's best to just
start writing something instead of just reading the book over and over again".
