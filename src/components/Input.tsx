import { Input as NativeBaseInput, IInputProps, FormControl, Text } from 'native-base';

type Props = IInputProps & {
    errorMessage?: string | null;
    title?: string;
    modalStyle?: boolean;
};

export function Input({ title, errorMessage = null, isInvalid, modalStyle = false, ...rest }: Props) {

    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={4}>
            <Text
                fontSize={modalStyle ? "sm" : "lg"}
                fontFamily={modalStyle ? "body" : "heading"}
                color={modalStyle ? "gray.700" : "white"}
                pb={modalStyle ? 2 : 1}
            >
                {title}
            </Text>
            <NativeBaseInput
                bg="gray.100"
                h={10}
                px={4}
                borderRadius={modalStyle ? 6 : 12}
                borderWidth={modalStyle ? 1 : 0}
                fontSize="md"
                color={modalStyle ? "gray.700" : "white"}
                fontFamily="body"
                placeholderTextColor="white"
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                _focus={{
                    bg: "gray.100",
                    borderWidth: 1,
                    borderColor: "purple.700"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage _text={{ color: "red.500" }}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}