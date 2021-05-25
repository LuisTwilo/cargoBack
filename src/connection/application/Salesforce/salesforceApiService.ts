import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SalesforceAPI {
  constructor(private readonly httpService: HttpService) {}

  async getObjectFields(bearer: string, object: string, instanceurl: string) {
    const url = `${instanceurl}/services/data/v51.0/sobjects/${object}/describe/`;

    const fields = await this.httpService
      .get(url, {
        headers: { Authorization: `Bearer ${bearer}` },
      })
      .toPromise();

    return fields.data.fields.map((field) => ({
      value: field.name,
      label: field.label,
    }));
  }

  async querySFData(instanceurl: string, query: string, bearer) {
    const url = `${instanceurl}/services/data/v51.0/query/?q=${query}`;
    let data = await (
      await this.httpService
        .get(url, {
          headers: { Authorization: `Bearer ${bearer}` },
        })
        .toPromise()
    ).data;

    if ('nextRecordsUrl' in data && data.nextRecordsUrl) {
      const remainingDataUrl = `${instanceurl}/${data.nextRecordsUrl}`;
      const remainingData = await (
        await this.httpService
          .get(remainingDataUrl, {
            headers: { Authorization: `Bearer ${bearer}` },
          })
          .toPromise()
      ).data;
      data.records = [...data.records, ...remainingData.records];
    }

    return data;
  }

  async getListofAvailableObjects(instanceurl: string, bearer: string) {
    const url = `${instanceurl}/services/data/v51.0/sobjects/`;

    const objectList = await this.httpService
      .get(url, {
        headers: { Authorization: `Bearer ${bearer}` },
      })
      .toPromise();

    return objectList.data.sobjects
      .filter(
        (object) =>
          object.searchable !== false &&
          object.creatable !== false &&
          object.queryable === true,
      )
      .map((object) => ({ value: object.name, label: object.label }));
  }

  async insertObjectList(
    records: any[],
    recordType: string,
    instanceurl: string,
    bearer,
  ) {
    let i = 0;
    const url = `${instanceurl}/services/data/v51.0/composite/sobjects/`;
    const recordsToInsert = records.map((record) => ({
      attributes: { type: recordType },
      ...record,
    }));

    return await (
      await this.httpService
        .post(
          url,
          { allOrNone: false, records: recordsToInsert },
          { headers: { Authorization: `Bearer ${bearer}` } },
        )
        .toPromise()
    ).data;
  }
}
