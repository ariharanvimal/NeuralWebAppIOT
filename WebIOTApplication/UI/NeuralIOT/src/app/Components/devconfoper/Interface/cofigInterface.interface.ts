export interface indconfig {
  id: string;
  pins: Pins;
}

export interface Pins {
  input: Input[];
  output: Output[];
}

export interface Input {
  p_no: string;
  p_name: string;
  p_type: string;
  p_default: string;
}

export interface Output {
  p_no: string;
  p_name: string;
  p_type: string;
  p_default: string;
}
export interface editPin {
  pin_no: string;
  pin_name: string;
  input_type: string;
  default_value: string;
  control_type: string;
}
