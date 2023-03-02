import { useTheme } from 'native-base';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FGTSbalance } from '@screens/FGTSbalance';
import { CpfRequest } from '@screens/CpfRequest';

type AppRoutes = {
    fgtsbalance: undefined;
    cpfrequest: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {

    const { sizes, colors } = useTheme();

    const iconSize = sizes[6];

    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='cpfrequest'>
            <Screen
                name="cpfrequest"
                component={CpfRequest}
            />
            <Screen
                name="fgtsbalance"
                component={FGTSbalance}
            />
        </Navigator>
    );
}