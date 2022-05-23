import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../slices/todoSlice';
import { getToday } from '../TodoForm/index';

interface CompletedProps {
  id: string;
  isCompleted: boolean;
}

const Checkbox = ({ id, isCompleted }: CompletedProps) => {
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
