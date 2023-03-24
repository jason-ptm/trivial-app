import { Subject } from 'rxjs'

export class subjectManager {
  subject$ = new Subject()

  getSubject() {
    return this.subject$.asObservable()
  }

  //eslint-disable-next-line
  setSubject(value: any) {
    this.subject$.next(value)
  }
}
