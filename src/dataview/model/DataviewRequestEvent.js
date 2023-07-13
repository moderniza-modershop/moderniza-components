
/**
 * Event emmited onRequest
 */
class DataviewRequestEvent {
  /**
     * @param {{pagination: {page: Number, peerPage: Number},
     * sorts:{sortField: String, sortOrder: Number},
     * filters: {value: String, operator: Object,
     * matchMode: String, constraints: {value: String,
     * matchMode: String}}[]}} options
     */
  constructor(options) {
    this.pagination = options.pagination
    this.filters = options.filters
    this.sorts = options.sorts
  }
}

export default DataviewRequestEvent
