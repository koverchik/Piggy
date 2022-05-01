import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useParamsIdType } from '../..';
import AddNewButton from '../../../../components/ButtonAddNewRow/ButtonAddNewRow';
import store from '../../../../state';
import './_styles.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AddNewRowWallet: React.FC = observer(() => {
  const { id } = useParams<useParamsIdType>();
  const [newName, setNewName] = useState<string>('');
  const [newCost, setNewCost] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        store.Wallet.addNewRow({
          date: data.date,
          name: data.name,
          cost: data.cost,
          namesWalletsId: id
        });
        setNewName('');
        setNewCost('');
      })}
    >
      <table className="table-add-new-value">
        <tbody>
          <tr>
            <td className="number-one-item">
              {store.Wallet.allRows.length + 1}
            </td>
            <td className="data-new-one-item">
              <input
                type="date"
                value={store.Wallet.newDataRaw}
                {...register('date', { required: true })}
                onChange={(event) => {
                  store.Wallet.newDataRaw = event.target.value;
                }}
              ></input>
            </td>
            <td className="new-one-item">
              <input
                type="text"
                value={newName}
                {...register('name', { required: true, maxLength: 100 })}
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
            </td>
            <td className="new-cost-one-item">
              <input
                type="text"
                value={newCost}
                {...register('cost', {
                  required: true,
                  pattern: /^[0-9]*[.,]?[0-9]+$/
                })}
                onChange={(event) => {
                  setNewCost(event.target.value);
                }}
              ></input>
            </td>
            <td className="user-write-item">
              <img src="../images/people.svg"></img>
            </td>
          </tr>
          <tr>
            <td className="error-row"></td>
            <td className="error-row"></td>
            <td className="error-row">
              {errors.name?.type === 'required' && t('error.requeued-field')}
            </td>
            <td className="error-row" colSpan={2}>
              {errors.cost?.type === 'required' && t('error.requeued-field')}
              {errors.cost?.type === 'pattern' &&
                t('error.incorrect-format') + ' 10.00'}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <AddNewButton />
      </div>
    </form>
  );
});
