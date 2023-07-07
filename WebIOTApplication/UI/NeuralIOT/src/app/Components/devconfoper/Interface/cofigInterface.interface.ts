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
