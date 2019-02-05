import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/modal_actions";

const asModal = SomeComponent => {
  const Modal = props => {
    if (!props.modal) {
      return null;
    }

    return (
      <div
        className="modal-background"
        onClick={() => {
          props.history.goBack();
          props.closeModal();
        }}
      >
        <i className="fas fa-times closing-x" />
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <SomeComponent />
        </div>
      </div>
    );
  };
  return Modal;
};

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export const modalMaker = SomeForm => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(asModal(SomeForm));
};
