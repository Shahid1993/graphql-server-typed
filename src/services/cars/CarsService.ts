import {Injectable} from 'injection-js'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {AbstractPubsubManager} from '../../graphql/subscriptions/Pubsub/AbstractPubsubManager'
import TOPICS from '../../graphql/subscriptions/Topics/PubsubTopicsImpl'
import {Car} from '../../interfaces/types'

@Injectable()
export class CarsService {
  private carList: Car[] = [{_id: '1234', name: 'sampleCar1'}, {_id: '1244', name: 'sampleCar2'}]

  constructor(private logger: AbstractLogger, private pubsubManager: AbstractPubsubManager) {}

  public getCars(carName?: string): Promise<Car[]> {
    this.logger.info('Returning all cars...')

    return new Promise((resolve) => {
      let filteredCarsList
      if (carName) {
        filteredCarsList = this.carList.filter((car) => car.name === carName)
        resolve(filteredCarsList)
      } else {
        resolve(this.carList)
      }
    })
  }

  public updateCarName(_id: string, newName: string): Promise<Car> {
    return new Promise((resolve) => {
      for (const car of this.carList) {
        if (car._id === _id) {
          car.name = newName
          this.pubsubManager.publish(TOPICS.CAR_CHANGED_TOPIC, {carChanged: car})
          resolve(car)

          return
        }
      }

      resolve({})
    })
  }
}
