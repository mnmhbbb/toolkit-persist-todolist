import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../slices/todoSlice';

interface CompletedProp {
  id: string;
  isCompleted: boolean;
}

const Checkbox = ({ id, isCompleted }: CompletedProp) => {
  const [checked, setChecked] = useState(isCompleted);
  const dispatch = useDispatch();

  const onCheck = useCallback(() => {
    setChecked(!checked);
    dispatch(toggle({ id }));
  }, [checked, id, dispatch]);

  return <input type='checkbox' checked={checked} onChange={onCheck} data-id={id} />;
};

export default Checkbox;
