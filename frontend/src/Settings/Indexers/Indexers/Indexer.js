import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from 'Components/Card';
import Label from 'Components/Label';
import IconButton from 'Components/Link/IconButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import { icons, kinds } from 'Helpers/Props';
import translate from 'Utilities/String/translate';
import EditIndexerModalConnector from './EditIndexerModalConnector';
import styles from './Indexer.css';

class Indexer extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditIndexerModalOpen: false,
      isDeleteIndexerModalOpen: false
    };
  }

  //
  // Listeners

  onEditIndexerPress = () => {
    this.setState({ isEditIndexerModalOpen: true });
  }

  onEditIndexerModalClose = () => {
    this.setState({ isEditIndexerModalOpen: false });
  }

  onDeleteIndexerPress = () => {
    this.setState({
      isEditIndexerModalOpen: false,
      isDeleteIndexerModalOpen: true
    });
  }

  onDeleteIndexerModalClose= () => {
    this.setState({ isDeleteIndexerModalOpen: false });
  }

  onConfirmDeleteIndexer = () => {
    this.props.onConfirmDeleteIndexer(this.props.id);
  }

  onCloneIndexerPress = () => {
    const {
      id,
      onCloneIndexerPress
    } = this.props;

    onCloneIndexerPress(id);
  }

  //
  // Render

  render() {
    const {
      id,
      name,
      enable,
      supportsRss,
      priority,
      showPriority
    } = this.props;

    return (
      <Card
        className={styles.indexer}
        overlayContent={true}
        onPress={this.onEditIndexerPress}
      >
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {name}
          </div>

          <IconButton
            className={styles.cloneButton}
            title={translate('CloneIndexer')}
            name={icons.CLONE}
            onPress={this.onCloneIndexerPress}
          />
        </div>

        <div className={styles.enabled}>

          {
            supportsRss && enable &&
              <Label kind={kinds.SUCCESS}>
                RSS
              </Label>
          }

          {
            showPriority &&
              <Label kind={kinds.DEFAULT}>
                {translate('Priority')}: {priority}
              </Label>
          }
          {
            !enable &&
              <Label
                kind={kinds.DISABLED}
                outline={true}
              >
                {translate('Disabled')}
              </Label>
          }
        </div>

        <EditIndexerModalConnector
          id={id}
          isOpen={this.state.isEditIndexerModalOpen}
          onModalClose={this.onEditIndexerModalClose}
          onDeleteIndexerPress={this.onDeleteIndexerPress}
        />

        <ConfirmModal
          isOpen={this.state.isDeleteIndexerModalOpen}
          kind={kinds.DANGER}
          title={translate('DeleteIndexer')}
          message={translate('DeleteIndexerMessageText', [name])}
          confirmLabel={translate('Delete')}
          onConfirm={this.onConfirmDeleteIndexer}
          onCancel={this.onDeleteIndexerModalClose}
        />
      </Card>
    );
  }
}

Indexer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  enable: PropTypes.bool.isRequired,
  supportsRss: PropTypes.bool.isRequired,
  supportsSearch: PropTypes.bool.isRequired,
  onCloneIndexerPress: PropTypes.func.isRequired,
  onConfirmDeleteIndexer: PropTypes.func.isRequired,
  priority: PropTypes.number.isRequired,
  showPriority: PropTypes.bool.isRequired
};

export default Indexer;
