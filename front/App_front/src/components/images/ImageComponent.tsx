import { type ImageType } from '../../app/features/colors/types/ImageType';

const ImageComponent = (props: ImageType) => {
  return (
    <div>
      <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
    </div>
  );
};

export default ImageComponent;
