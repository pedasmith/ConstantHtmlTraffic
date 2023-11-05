function CalculateStatistics(data)
{
    n = data.length;
    total = 0;
    total_squared = 0;
    for (var i=0; i<n; i++)
    {
        value = data[i];
        total += value;
        total_squared += (value * value);
    }
    mean = total / n;
    data.sort((v1,v2) => v1-v2); // sort numerically because JavaScript is a terrible language.
    median = data[n / 2];
    q1 = Interpolate(data, 0.25);
    q3 = Interpolate(data, 0.75);

    p90 = Interpolate(data, 0.90);
    p95 = Interpolate(data, 0.95);
    p99 = Interpolate(data, 0.99);
    p995 = Interpolate(data, 0.995);

    return {
        'N': n,
        'Mean': mean,
        'Median': median,
        'Min': data[0],
        'Max': data[n-1],
        'P90': p90,
        'P95': p95,
        'P99': p99,
        'P995': p995,
        'Q1': q1,
        'Q3': q3,
        'Total': total,
        'Total_squared': total_squared
    }
}

function Interpolate(data, pct)
{
    const n = data.length;
    const idx = (n-1) *pct;
    const idx_low = Math.floor(idx);
    const idx_high = Math.ceil(idx);
    //console.log ("TRACE: Interpolate:idx=" + idx + " _low=" + idx_low + " _high=" + idx_high);
    // e.g.: when ratio == 0, value at [idx_high] is weighted 0 and at [idx_low] at 1-0 = 1

    const ratio = (idx - idx_low); // _low and _high are either 1 apart or 0 apart; if 
        // they are zero apart then also idx_low == idx == idx_high and ratio can be anything.
    const value_high = data[idx_high] * ratio;
    const value_low = data[idx_low] * (1 - ratio);
    const value = value_low + value_high;
    //console.log ("TRACE: Interpolate: ratio=" + ratio + " value=" + value + " _low=" + value_low + " _high=" + value_high);
    return value;
}

function Test_Interpolate()
{
    var nerror = 0;
    const data = [1, 2, 3, 4, 5];
    nerror += Test_Interpolate_One(data, 0, 1.0);
    nerror += Test_Interpolate_One(data, .45, 2.80);
    nerror += Test_Interpolate_One(data, .5, 3.0);
    nerror += Test_Interpolate_One(data, 1.0, 5.0);
    nerror += Test_Interpolate_One(data, 0.95, 4.8);

    return nerror;
}

function Test_Interpolate_One(data, pct, expected)
{
    var nerror = 0;
    const actual = Interpolate (data, pct);
    delta = Math.abs(actual - expected)
    if (delta > 0.000001) // allow for small error
    {
        nerror += 1
        console.log("ERROR: Interpolate (data, pct) exected="+expected+" actual="+actual)
    }
    return nerror;
}