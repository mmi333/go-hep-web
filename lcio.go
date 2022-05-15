package main
import (
	"encoding/json"
	"io"
	"log"
	"fmt"


	"go-hep.org/x/hep/lcio"

)

type Event struct {
	EventNumber     string `json:"event_number"`
	RunNumber string `json:"run_number"`
	Detector string `json:"detector"`
	Collections string `json:"collections"`
	CalohitsCount string `json:"calohits_count"`
	Calohits []string `json:"calohits"`

}

func GetEventData() []byte {
	// returns event data as JSON
	r, err := lcio.Open("uploaded/event_golden.slcio")
	if err != nil {
		log.Fatal(err)
	}
	defer r.Close()

	events := []*Event{}

	for r.Next() {
		evt := r.Event()
		calohits := evt.Get("CaloHits").(*lcio.CalorimeterHitContainer)
		calohitsStrings := make([]string, len(calohits.Hits))

		for i, hit := range calohits.Hits {
			calohitsStrings[i] = fmt.Sprintf(" calohit[%d]: cell-id0=%d cell-id1=%d ene=%+e ene-err=%+e\n",
			i, hit.CellID0, hit.CellID1, hit.Energy, hit.EnergyErr,
		)
		}


		event := &Event{
			EventNumber: fmt.Sprintf("%d (weight=%+e)\n", evt.EventNumber, evt.Weight()),
			RunNumber: fmt.Sprintf("%d\n", evt.RunNumber),
			Detector: fmt.Sprintf("%q\n", evt.Detector),
			Collections: fmt.Sprintf("%v\n", evt.Names()),
			CalohitsCount: fmt.Sprintf("%d\n", len(calohits.Hits)),
			Calohits: calohitsStrings,
		
		}

		events = append(events, event)


	
	}

	err = r.Err()
	if err == io.EOF {
		err = nil
	}

	if err != nil {
		log.Fatal(err)
	}

	data, _ := json.Marshal(events)
	return data
}
