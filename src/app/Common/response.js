import { getFrom, getTo, getNextPageUrl, getPrevPageUrl } from '../Heplers/global'

class Response {
  Error (message = 'SERVER_ERROR', code = 500) {
    return {
      status:  false,
      data:    null,
      message: message,
      code:    code
    }
  }

  Ok (data, message = 'success') {
    return {
      status:  true,
      data:    data,
      message: message,
      code:    200
    }
  }

  pagination (data, total, currentPage, perPage, path) {
    let lastPage     = Math.ceil(total / perPage)
    let from         = getFrom(total, currentPage, perPage)
    let to           = getTo(total, currentPage, perPage, lastPage)
    let lastPageUrl  = `${ path }?page=${ lastPage }`
    let firstPageUrl = `${ path }?page=1`
    let nextPageUrl  = getNextPageUrl(path, total, currentPage, perPage, lastPage)
    let prevPageUrl  = getPrevPageUrl(path, total, currentPage, perPage, lastPage)

    return {
      current_page:   currentPage,
      data:           data,
      from:           from,
      first_page_url: firstPageUrl,
      last_page_url:  lastPageUrl,
      next_page_url:  nextPageUrl,
      prev_page_url:  prevPageUrl,
      last_page:      lastPage,
      path:           path,
      per_page:       perPage,
      to:             to,
      total:          total
    }
  }
}

export default new Response()