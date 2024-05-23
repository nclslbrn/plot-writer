# Plot-writer

A SVG text writer for plotter.
This library allows you to obtain an SVG plot from text, each glyph drawn with simple lines (no outlines).

![a plot made with PlotWriter](https://raw.githubusercontent.com/nclslbrn/plot-writer/main/plotwriter.jpg)

This library is currently in beta.
The SVG font will support all characters of the [Latin Extended-A alphabet](https://en.wikipedia.org/wiki/Latin_Extended-A).

# Why 
I wanted to incorporate text into my plotter drawings, but I couldn't find any vector typography that could be used with JavaScript, so I decided to create this tool. Without this specific need I probably wouldn't have created any typography.

Already existing tools exist but doesn't fit all my need :
- p5js has a function (textToPoints) to export vector from text you get an outline and not the inner stroke, and if the text is small, that's a lot of point.
- An extension of Inkscape, Hershey text allows you transform a text into a vector (inner stroke) but it changes the size and appearance of the text.

I wanted something that could be integrated into my code so that I could be more precise about the position and size of the text. Using vectors from JS, it's also possible to apply transformations to them.


The glyphs are currently being designed.

The library will be published on npm once completed, but you can already try it out by compiling the sources (yarn run build), which will create the modules in several formats (CommonJS, UMD and EsNext) in dist/.
