import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import { Picker } from "@react-native-community/picker";

import { useField } from "@unform/core";

interface OptionsProps {
  id: string;
  label: string;
}

interface Props {
  name: string;
  options: OptionsProps[];
}

const Choice: React.FC<Props> = ({ name, options }) => {
  const choiceRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: choiceRef.current,
    });
  }, [fieldName, registerField]);
  return (
    <View>
      <Picker ref={choiceRef} key={name}>
        {options.map((opt) => {
          <Picker.Item value={opt.id} label={opt.label} />;
        })}
      </Picker>
    </View>
  );
};

export default Choice;
