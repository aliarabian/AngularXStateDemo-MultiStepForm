import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private VALID_SUBJECTS: string[] = ["12", "123", "74", "2000"]

  constructor() {
  }

  inquireSubject(dest: string): Observable<boolean> {
    return this.isSubjectValid(dest);
  }

  private isSubjectValid(dest: string): Observable<boolean> {
    console.log(dest)
    let subjectExists = this.VALID_SUBJECTS.find((x) => dest === x) !== undefined;
    console.log(subjectExists);
    return of(subjectExists);
  }
}
