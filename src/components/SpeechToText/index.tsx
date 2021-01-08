import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from "../../constants/AudioOptions";
import { Text, View } from "../Themed";
import Button from "../Button";

import api from "../../services/api";
import { Platform } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { RECORDING_OPTIONS_PRESET_LOW_QUALITY } from "expo-av/build/Audio";

const SpeechToText = () => {
  const [recording, setRecording] = useState(new Audio.Recording());
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");
  const [permission, askPermission, getPermission] = Permissions.usePermissions(
    Permissions.AUDIO_RECORDING
  );
  useEffect(() => {
    askPermission();
  }, []);

  const deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI() || "");
      await FileSystem.deleteAsync(info.uri);
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI() || "");
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const formData = new FormData();
      const Curi = await FileSystem.getContentUriAsync(info.uri).then(
        (curi) => {
          return curi.toString();
        }
      );
      formData.append("audio", info.uri);

      FileSystem.uploadAsync("http://192.168.0.46:3333/speech", info.uri, {
        headers: {
          ContentType: "multipart/form-data",
        },
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "audio",
        httpMethod: "PATCH",
      })
        .then((response) => {
          console.log(JSON.stringify(response));
        })
        .catch((error) => {
          console.log("Upload error " + error);
        });
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecording();
      resetRecording();
    }
    setIsFetching(false);
  };

  const startRecording = async () => {
    const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") return;

    setIsRecording(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true,
    });
    const recording = new Audio.Recording();

    try {
      await askPermission();
      await recording.prepareToRecordAsync(
        RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      stopRecording();
    }

    setRecording(recording);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      await setRecording(recording);
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
  };

  const resetRecording = () => {
    deleteRecordingFile();
    setRecording(new Audio.Recording());
  };

  const handleOnPressIn = () => {
    startRecording();
  };

  const handleOnPressOut = () => {
    stopRecording();
    getTranscription();
  };

  return (
    <View>
      <Text>Testando</Text>
      <Button
        label="Gravar"
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      />
    </View>
  );
};

export default SpeechToText;
