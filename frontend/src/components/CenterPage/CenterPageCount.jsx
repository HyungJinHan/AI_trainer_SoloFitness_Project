import React from 'react';

function CenterPageCount({
  page,
  handlepage
}) {
  return (
    <div>
      <div>
        <a id={page} onClick={handlepage}>
          [{page}]
        </a>
        &nbsp;
      </div>
    </div>
  );
}

export default CenterPageCount;