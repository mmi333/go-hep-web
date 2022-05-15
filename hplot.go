
package main
import (
	"log"
	"image/color"

	"golang.org/x/exp/rand"
	"gonum.org/v1/gonum/stat/distuv"

	"go-hep.org/x/hep/hbook"

	"gonum.org/v1/plot/vg"
	"go-hep.org/x/hep/hplot"

)

func HandleH1DPlot(title string, npoints int, mu float64, sigma float64, nbins int, min float64, max float64)  {

	// Create a normal distribution.
	dist := distuv.Normal{
		Mu:    mu,
		Sigma: sigma,
		Src:   rand.New(rand.NewSource(0)),
	}

	// Draw some random values from the standard
	// normal distribution.
	hist := hbook.NewH1D(nbins, min, max)
	for i := 0; i < npoints; i++ {
		v := dist.Rand()
		hist.Fill(v, 1)
	}

	// normalize histogram
	area := 0.0
	for _, bin := range hist.Binning.Bins {
		area += bin.SumW() * bin.XWidth()
	}
	hist.Scale(1 / area)

	// Make a plot and set its title.
	p := hplot.New()
	p.Title.Text = title
	p.X.Label.Text = "X"
	p.Y.Label.Text = "Y"

	// Create a histogram of our values drawn
	// from the standard normal.
	h := hplot.NewH1D(hist)
	p.Add(h)

	// The normal distribution function
	norm := hplot.NewFunction(dist.Prob)
	norm.Color = color.RGBA{R: 255, A: 255}
	norm.Width = vg.Points(2)
	p.Add(norm)

	// draw a grid
	p.Add(hplot.NewGrid())

	// Save the plot to a PNG file.
	if err := p.Save(6*vg.Inch, -1, "uploaded/h1d_plot.png"); err != nil {
		log.Fatalf("error saving plot: %v\n", err)
	}

}
