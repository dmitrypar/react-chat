import React from 'react'

const Modal = ({
    submitHandler,
    inputHandler,
    setDisplayChannelList,
    dislayedChannels
}) => {
    return (
        <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Создать канал
                </h5>
                <button
                  type="button"
                  className="close modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label className="col-form-label">Название:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="channelName"
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Описание:</label>
                    <textarea
                      className="form-control"
                      name="channelDescription"
                      onChange={inputHandler}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() =>
                    setDisplayChannelList(
                      dislayedChannels
                    )
                  }
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Создать канал
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Modal
