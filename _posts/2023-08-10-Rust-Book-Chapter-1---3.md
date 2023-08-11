---
layout: post
title: Rust Chapter 1 to 3
header: Rust Chapter 1 to 3
tags: Rust
---

I initially read the Rust book from cover to cover last year around this time
since my team was starting to make the transition to utilizing the language more
for production and it made sense for us to start a mini book club to get to know
the language and why it's been the most loved language on StackOverflow's
[Developer Survey](https://survey.stackoverflow.co/2022/#most-loved-dreaded-and-wanted-language-love-dread).
This was the first language I had picked up outside of the 2 languages I had
mainly used in college so my main focus for the first pass at the book was to
absorb whatever I can about the language at a high level without having to worry
too much about the fine details. After the first pass, the key things that
really stood out within the language are the concept of ownership, lifetimes,
and error handling. I'll touch on these again as I make my way through the
chapters again but we'll focus on the introductory first. I've grouped chapters
1 through 3 in this single post simply because the first two chapters are more
of a preface for what to expect and chapter 3 is when the books starts to dive
into a single topic.

## Chapter 1 and 2

The first two chapters are mainly focussed on getting a rust environment set up
and running. First with a simple "Hello World" type project and then followed by
a simple guessing game that throws everything in at once just to get you
familiar with the syntax of the language. The build process felt like much like
if C++ had a main package/library manager set up from the beginning. You have a
compiler binary (`gcc`/`g++` vs `rustc`) which will take the .rs file and
compile that into a binary to be executed by the user. But on top of that, you
have Cargo which is the build system and package manager in one. I associate it
closely with having a `make`/`cmake` system along with Python's PIP in one. You
have a way to create the binary without having to pass every single flag into
`rustc` while also the ability to install crates that you'd like to use for the
project. You keep track of this through the `Cargo.toml` file. It makes the
build process so much easier than having to learn how to use `make` where you
have to set up commands by hand to build the binary when end up copying, pasting
and tweaking this makefile every time anyway. But this of course is what you
consider the happy path which probably covers 90% of project build workflows in
general. I'm sure there are other workflows that cargo doesn't fully cover but
that could probably be aided by utilizing a makefile again.

## Chapter 3

I've broken up key points into sections with my opinions below

### Mutability

One of the things that I really enjoyed from the beginning about Rust was that
it treated each variable as immutable by default. When I'm writing code, I find
myself only needing to modify a few variables per function while other variables
are treated more as constants. For C++, you normally add the `const` keyword
when you declare the variable but more often than not, you either forget to do
this or get lazy about adding it in. Making the `mut` a requirement for
variables that are meant to be modified makes it clear which variables will
change as it progresses through the code.

### Functions

In terms of syntax for functions go, I see that we're beginning to settle on how
parameters are defined in various languages. I agree that having the types of
each parameter being defined makes a ton of sense but the ordering was a little
backwards in my head compared to C++ which formats parameters with the type
first, followed by the name whereas Rust and even Python3 now has the name
first, followed by a colon and then the type defined after. Typescript also
follows this format as well. I wish I could dig deeper and ask the question of
why we've settled with this format for various languages but I'll leave that for
another time when I go down the rabbit hole of programming languages.

One thing that really stood out to me was how return types were handled in Rust.
Most languages I've worked with require the `return` keyword at the end of
function if you need a value or reference to be passed back to the caller. For
Rust's case, this is only required if you need the function to end early.
Otherwise you could end the function with a statement while also omitting the
semicolon at the end

---

This is it for now. I'll probably stick to a chapter at a time from here on out
unless I feel some sections are a little light on material.
