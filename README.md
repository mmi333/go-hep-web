## Go-HEP-Web

I built this for the [GoHack](https://devpost.com/software/go-hep-web/) hackathon.

## Inspiration

I wanted to try and create something useful that isn't too far from the main theme of the hackathon. While command line tools are awesome, sometimes a browser can provide a better experience (especially when it comes to plotting, showing data, and interactivity)

It seemed like a nice mix of a fun, potentially useful project that's also within my skillset. 

## What it does

It allows you to use some tools from Go-HEP from your browser (namely some functionalities of lcio and hplot). 

You can view .slcio files from your browser or create a histogram and be able to zoom/pan easily.

## How it was built

The front-end is built with Next.js and the back-end is in Go.

As for the choice of front-end, I went with Next.js because I'm familiar with it, and it made some things easier (like zooming and panning images).

The back-end couldn't have been made without Go as it uses Go-HEP to provide its functionality.  

## Challenges I ran into

Choosing the stack wasn't straightforward. (I didn't even know I could use Next.js with Go)

Marshalling the output of Go-HEP into JSON needed some work.



## What I learned

A lot about Go!

How to write a simple back-end, how to deal with I/O, JSON serialization, etc.

