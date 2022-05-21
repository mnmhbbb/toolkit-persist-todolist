import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../slices/todoSlice';
import { getToday } from '../TodoForm/index';

interface CompletedProp {
  id: string;
  isCompleted: boolean;
}

const Checkbox = ({ id, isCompleted }: CompletedProp) => {
  const [checked, setChecked] = useState(isCompleted);
  const dispatch = useDispatch();

  const onCheck = useCallback(() => {
    setChecked(!checked);
    const completedAt = getToday();
    dispatch(toggle({ id, completedAt }));
  }, [checked, id, dispatch]);

  return <input type='checkbox' checked={checked} onChange={onCheck} data-id={id} />;
};

export default Checkbox;
