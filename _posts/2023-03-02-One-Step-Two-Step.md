---
layout: post
title: Two Steps Forward, One Step back
header: Progress
tags: softwarecareer techlayoffs
---

I initially called this post "One step forward, Two steps back" but that felt more like I've gotten worse as a
software developer over the last 4.5 years which I highly doubt is true. It's been rocky nonetheless but I've picked up
a thing or two from the places I've worked whether that be technical skills or soft skills with how to be more
effective at how to get the job done without wasting much time. But I digress.

The tech industry hit a really large speed bump (potentially a pot hole) which led to a lot of companies laying off part
of their workforce. I unfortunately one of the unlucky many who got caught up in the reduction. I had a lot of mixed
feelings when this happened back in November '22. There was definitely the [5 stages of grief](https://www.verywellmind.com/five-stages-of-grief-4175361)
angle that I wrestled with since I was really hoping to contribute more to the company while also honing in on my general
software engineering practices there. Now it's back to the grind of looking for a job where each employer has only so
much time to judge if I would be a good enough candidate for them to get the job done. On the other hand, there was
surprisingly a sense of relief in the sense that I have a lot of time I can allocate to things I had been wanting to
explore for a while but just didn't have the time since my other priorities kept pushing those things further and further
down in the backlog.

Right out of college, I had focussed most of my career in the backend space of the software industry since I really
enjoyed the problem solving aspect of things that aren't obviously visible to the end user with out proper logging
observability metrics in place. Plus the joy of seeing how messy everyone's backend system is and the chaos that ensues
there just brings me some odd joy once I am able to figure out how to solve issues in the system. One of the things that
became inevitable with my last job was just the sheer knowledge gap compared to my peers who have 10+ years of
experience in backend systems so different microservice architecture designs were hard to contribute to without asking
very basic questions just to get myself up to speed with all the lingo being thrown around. So one of the things I'm
focussing on during my time unemployed is trying to get a grasp of the different services out there that are currently
being used in production environments. I got a glimpse as to what some of those things might be:

- Logging/observability
  - Reading through raw logs can only go so far. Especially with the basic CTRL-F to look for keywords. Having an
    effective way to sift through the endless stream of messages can drastically reduce debugging.
  - Not just log messages but also profiling information like "How long did this task take to run? Where is it spending
    the most amount of time?"
  - Examples services of this might include Grafana or Datadog.
- Event streaming/Message Brokers
  - Each microservice generates some kind of event that other services might take advantage of. There needs to be a
    reliable way to send and receive events so each service is in sync and can operate as one whole product. It can
    also be a great way to reproduce errors since those events will persist somewhere in storage (As long as it's part
    of the product's design).
  - Some services I've seen being used are RabbitMQ and Kafka

Just two large bullet points but if you were to talk to me a year ago, these would not be on my list of services I would
have been aware of. So baby steps I suppose.
