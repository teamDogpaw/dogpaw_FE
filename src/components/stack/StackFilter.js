import { MyStack } from '../../styles/style';
import { Stacks } from '../../utils/enums';
import styled from 'styled-components';
import { useState } from 'react';

const StackFilter = ({
  filterList,
  list,
  setFilterList,
  setMainSelectedStack,
  mainSelectedStack,
}) => {
  let newList = [];
  const [selectedStack, setSelectedStack] = useState([]);

  const changeStack = (newStack) => {
    setSelectedStack(newStack);
    //console.log(selectedStack)
    //console.log(newStack)
    if (!selectedStack.includes(newStack)) {
      const newStackFilterArray = selectedStack.concat(newStack);
      //console.log(newStackFilterArray)
      setSelectedStack(newStackFilterArray);
      addFilter();
      return newStackFilterArray;
    } else if (selectedStack.includes(newStack)) {
      const newStackFilterArray = selectedStack.filter(
        (stack) => stack !== newStack,
      );
      //console.log(newStackFilterArray)
      setSelectedStack(newStackFilterArray);
      removeFilter();
    }
  };

  const addFilter = async () => {
    selectedStack.map((stack) => {
      //console.log(stack)
      return (newList = filterList.concat(
        list.filter((arr) => arr.stacks.includes(stack)),
      ));
    });
    setFilterList(newList);
  };

  const removeFilter = async () => {
    selectedStack.map((stack) => {
      //console.log(stack)
      return (newList = filterList.filter(
        (arr) => !arr.stacks.includes(stack),
      ));
    });
    setFilterList(newList);
  };

  const ALL_STACK = Object.values(Stacks);

  return (
    <StackList>
      {ALL_STACK.map((stack, index) => {
        return (
          <StackFilterSelect key={index} onClick={() => changeStack(stack)}>
            #{stack}
          </StackFilterSelect>
        );
      })}
    </StackList>
  );
};

const StackFilterSelect = styled(MyStack)`
  cursor: pointer;
  margin-bottom: 16px;
`;

const StackList = styled.div`
  margin: 4px 0px;
  display: flex;
  flex-wrap: wrap;
`;

export default StackFilter;
