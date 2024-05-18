import {
  Flex,
  Box,
  Card,
  Text,
  TextField as RadixTextField,
  Button,
  ChevronDownIcon,
  IconButton,
} from '@radix-ui/themes';
import NoOutlineIconButton from './NoOutlineIconButton';
import CheckboxFormField from './CheckboxFormField';
import RadioFormField from './RadioFormField';
import TextFormField from './TextFormField';
import { FormFieldType } from './formField';
import { ChevronUpIcon, Cross1Icon } from '@radix-ui/react-icons';

export default function FormField(props: {
  field: FormFieldType;
  onChange: (field: FormFieldType) => void | undefined;
  onMoveUp: () => void | undefined;
  onMoveDown: () => void | undefined;
  onDelete: () => void | undefined;
}) {
  let theField: React.ReactNode;
  switch (props.field.type) {
    case 'text':
      theField = (
        <TextFormField field={props.field} onChange={props.onChange} />
      );
      break;
    case 'radio':
      theField = (
        <RadioFormField field={props.field} onChange={props.onChange} />
      );
      break;
    case 'checkbox':
      theField = (
        <CheckboxFormField field={props.field} onChange={props.onChange} />
      );
      break;
  }

  function onPromptChange(evt: React.ChangeEvent<HTMLInputElement>) {
    props.onChange({
      ...props.field,
      prompt: evt.target.value,
    });
  }

  return (
    <Card>
      <Flex gap="3">
        <Flex direction="column" justify="center" align="center" gap="2">
          <NoOutlineIconButton onClick={props.onMoveUp}>
            <ChevronUpIcon />
          </NoOutlineIconButton>
          <NoOutlineIconButton onClick={props.onDelete}>
            <Cross1Icon />
          </NoOutlineIconButton>
          <NoOutlineIconButton onClick={props.onMoveDown}>
            <ChevronDownIcon />
          </NoOutlineIconButton>
        </Flex>
        <Flex direction="column">
          <Text as="p" size="5">
            Field Type: {props.field.type}
          </Text>
          <Text as="p" size="4">
            Prompt
          </Text>
          <RadixTextField.Root
            placeholder="Type prompt message..."
            required={true}
            onChange={onPromptChange}
            value={props.field.prompt}
          ></RadixTextField.Root>
          {theField}
        </Flex>
      </Flex>
    </Card>
  );
}
