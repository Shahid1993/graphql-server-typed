import {IAppContext} from '../../interfaces/IAppContext'
import {Car, CarQueryArgs, UpdateCarNameMutationArgs} from '../../interfaces/types'
import {CarsService} from '../../services/cars/CarsService'
import TOPICS from '../subscriptions/Topics/PubsubTopicsImpl'

const CAR_CHANGED_TOPIC = TOPICS.CAR_CHANGED_TOPIC

const resolveFunctions = {
  Query: {
    car(_, args: CarQueryArgs, context: IAppContext): Promise<Car[]> {
      const carsService: CarsService = context.carsService

      return carsService.getCars(args.name)
    }
  },

  Mutation: {
    updateCarName(_, args: UpdateCarNameMutationArgs, context: IAppContext): Promise<Car> {
      const carsService: CarsService = context.carsService

      return carsService.updateCarName(args._id, args.newName)
    }
  },

  Subscription: {
    carChanged: {
      subscribe: (_, args, context: IAppContext) =>
        context.pubsubManager.getPubSub().asyncIterator(CAR_CHANGED_TOPIC)
    }
  }
}

export default resolveFunctions
