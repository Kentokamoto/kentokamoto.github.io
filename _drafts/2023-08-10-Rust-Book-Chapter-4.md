---
layout: post
title: Rust Chapter 4
header: Rust Chapter 4
tags: Rust
---

This was the chapter that really changed my perspective on Rust almost as though
this is a fundamental law of how the programming language functions as a whole.
As mentioned in the book, the three rules for ownership are:

-   Each value in Rust has an owner.
-   There can only be one owner at a time.
-   When the owner goes out of scope, the value will be dropped.

The term "out of scope" was a little different from what I am used to coming
from C++ and Python. From my experience, "out of scope" would refer to the end
of a code block. Once that block ends, the local variables within that block are
popped off the stack. From what the Rust book explains, "out of scope" more
refers to when a variable is no longer being used. This can happen at the end of
a block or the value of the variable is moved to a new variable. Of course this
definition depends on the data type, mainly focussed on more complex types like
the `String` type.
