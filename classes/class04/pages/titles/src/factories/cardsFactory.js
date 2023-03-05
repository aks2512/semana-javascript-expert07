import "./../../lib/sdk.js";
import CardsController from "./../controllers/cardsController.js"
import CardsService from "./../services/cardsService.js"
import CardsView from "./../views/cardsView.js"

const cardListWorker = new Worker(`./src/workers/cardListWorker.js`, { type: "module" })

const [rootPath] = window.location.href.split('/pages/')
const factory = {
  async initialize() {
    return CardsController.initialize({
      worker: cardListWorker,
      view: new CardsView(),
      service: new CardsService({ 
        dbUrl: `${rootPath}/assets/database.json`,
        cardListWorker
      })
    })
  }
}

export default factory