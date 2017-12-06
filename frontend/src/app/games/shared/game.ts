export class Game {
  constructor(public id: number,
              public title: string,
              public developer: string,
              public rating: number) {
  }
}

export class Comment {
  constructor(public id: number,
              public description: string,
              public is_critic: boolean,
              public is_user: boolean,
              public sentiment_score: number,
              public sentiment_magnitude: number) {

  }
}
