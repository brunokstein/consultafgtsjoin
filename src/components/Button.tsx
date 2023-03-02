import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            w="full"
            py={1}
            px={4}
            rounded={12}
            bg="purple.700"
            _pressed={{
                bg: 'purple.900'
            }}
            {...rest}
        >
            <Text
                color="white"
                fontFamily="heading"
                fontSize="lg"
            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}