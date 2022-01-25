import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import PaperComponent from '../paper';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

function DeviceInfoOverlay () {
  const [deviceType, setDeviceType] = React.useState('');

  React.useEffect(() => {
    async function getDeviceInfo() {
      let devicetype = await Device.getDeviceTypeAsync();
      setDeviceType(Device.DeviceType[devicetype]);
    }
    getDeviceInfo()
  })


  return (
    <ScrollView>
      <PaperComponent.Caption>Brand: {Device.brand}</PaperComponent.Caption>
      <PaperComponent.Caption>Manufacturer: {Device.manufacturer}</PaperComponent.Caption>
      <PaperComponent.Caption>Model name: {Device.modelName}</PaperComponent.Caption>
      <PaperComponent.Caption>Model ID: {Device.modelId}</PaperComponent.Caption>
      <PaperComponent.Caption>Design Name: {Device.designName}</PaperComponent.Caption>
      <PaperComponent.Caption>Product Name: {Device.productName}</PaperComponent.Caption>
      <PaperComponent.Caption>Device Year Class: {Device.deviceYearClass}</PaperComponent.Caption>
      <PaperComponent.Caption>Total Memory: {Device.totalMemory}</PaperComponent.Caption>
      <PaperComponent.Caption>Supported CPU Arch: {Device.supportedCpuArchitectures}</PaperComponent.Caption>
      <PaperComponent.Caption>OS Name: {Device.osName}</PaperComponent.Caption>
      <PaperComponent.Caption>OS Version: {Device.osVersion}</PaperComponent.Caption>
      <PaperComponent.Caption>OS Build ID: {Device.osBuildId}</PaperComponent.Caption>
      <PaperComponent.Caption>OS Internal Build ID: {Device.osInternalBuildId}</PaperComponent.Caption>
      <PaperComponent.Caption>OS Build Fingerprint: {Device.osBuildFingerprint}</PaperComponent.Caption>
      <PaperComponent.Caption>Platform API Level: {Device.platformApiLevel}</PaperComponent.Caption>
      <PaperComponent.Caption>Device Name: {Device.deviceName}</PaperComponent.Caption>
      <PaperComponent.Caption>Device Type: {deviceType}</PaperComponent.Caption>
      <PaperComponent.Caption>Constant Platform: {JSON.stringify(Constants.platform?.web?.ua)}</PaperComponent.Caption>
    </ScrollView>
  );
}

export default DeviceInfoOverlay;

const styles = StyleSheet.create({

});
