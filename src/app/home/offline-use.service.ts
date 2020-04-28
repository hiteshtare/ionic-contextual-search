import { Injectable } from '@angular/core';

import * as tfconv from '@tensorflow/tfjs-converter';
import * as tf from '@tensorflow/tfjs-core';
import { Tokenizer } from '@tensorflow-models/universal-sentence-encoder';

const BASE_PATH =
  'assets/models/';

export class UniversalSentenceEncoder {
  public model: any;
  public tokenizer: any;
}

declare interface ModelInputs extends tf.NamedTensorMap {
  indices: tf.Tensor;
  values: tf.Tensor;
}

@Injectable()
export class OfflineUniversalSentenceEncoderService {
  public use;

  constructor() {
    this.use = new UniversalSentenceEncoder();
  }

  public async load() {
    console.log(`load - OfflineUniversalSentenceEncoderService`);
    const [model, vocabulary] =
      await Promise.all([this.loadModel(), this.loadVocabulary()]);

    this.use.model = model;
    this.use.tokenizer = new Tokenizer(vocabulary);

    return this.use;
  }

  async loadModel() {
    return tfconv.loadGraphModel(
      `${BASE_PATH}`,
      { fromTFHub: true });
  }

  /**
  * Load a vocabulary for the Tokenizer.
  *
  * @param pathToVocabulary Defaults to the path to the 8k vocabulary used by the
  * UniversalSentenceEncoder.
  */
  async loadVocabulary(pathToVocabulary = `${BASE_PATH}vocab.json`) {
    const vocabulary = await tf.util.fetch(pathToVocabulary);
    return vocabulary.json();
  }


  /**
   * Load the Tokenizer for use independently from the UniversalSentenceEncoder.
   *
   * @param pathToVocabulary (optional) Provide a path to the vocabulary file.
   */
  async  loadTokenizer(pathToVocabulary?: string) {
    const vocabulary = await this.loadVocabulary(pathToVocabulary);
    const tokenizer = new Tokenizer(vocabulary);
    return tokenizer;
  }

  /**
   *
   * Returns a 2D Tensor of shape [input.length, 512] that contains the
   * Universal Sentence Encoder embeddings for each input.
   *
   * @param inputs A string or an array of strings to embed.
   */
  async embed(inputs: string[] | string): Promise<tf.Tensor2D> {
    console.log(`embed - OfflineUniversalSentenceEncoderService`);

    if (typeof inputs === 'string') {
      inputs = [inputs];
    }

    const encodings = inputs.map(d => this.use.tokenizer.encode(d));

    const indicesArr =
      encodings.map((arr, i) => arr.map((d, index) => [i, index]));

    let flattenedIndicesArr: Array<[number, number]> = [];
    for (let i = 0; i < indicesArr.length; i++) {
      flattenedIndicesArr =
        flattenedIndicesArr.concat(indicesArr[i] as Array<[number, number]>);
    }

    const indices = tf.tensor2d(
      flattenedIndicesArr, [flattenedIndicesArr.length, 2], 'int32');
    const values = tf.tensor1d(tf.util.flatten(encodings) as number[], 'int32');

    const modelInputs: ModelInputs = { indices, values };

    const embeddings = await this.use.model.executeAsync(modelInputs);
    indices.dispose();
    values.dispose();

    return embeddings as tf.Tensor2D;
  }
}

export { Tokenizer }