function solution(D) {
    // Days array matching getUTCDay: 0=Sun,1=Mon,...,6=Sat
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = {
        'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0
    };

    // Compute sums and counts
    const daySums = new Array(7).fill(0);
    const dayCounts = new Array(7).fill(0);

    for (const [dateStr, value] of Object.entries(D)) {
        const date = new Date(dateStr + 'T00:00:00Z'); // Ensure UTC
        const dayIndex = date.getUTCDay(); // 0=Sun,1=Mon,...,6=Sat
        daySums[dayIndex] += value;
        dayCounts[dayIndex]++;
    }

    // Calculate overall mean for gaps
    const totalSum = daySums.reduce((a, b, i) => a + (dayCounts[i] > 0 ? b : 0), 0);
    const totalCount = dayCounts.filter(c => c > 0).length;
    const overallMean = totalCount > 0 ? Math.floor(totalSum / totalCount) : 0;

    // Linear order: index 0=Mon(1),1=Tue(2),...,5=Sat(6),6=Sun(0)
    const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const linearSums = new Array(7).fill(0);
    const linearHas = new Array(7).fill(false);

    for (let li = 0; li < 7; li++) {
        const di = (li + 1) % 7;
        linearSums[li] = daySums[di];
        linearHas[li] = dayCounts[di] > 0;
    }

    // Fill missing gaps
    let current = 0;
    while (current < 7) {
        if (linearHas[current]) {
            current++;
            continue;
        }
        const start_gap = current;
        while (current < 7 && !linearHas[current]) {
            current++;
        }
        const end_gap = current - 1;  // Now current is the next has or 7
        const next_li = current % 7;  // Handle circular
        const prev_li = ((start_gap - 1 + 7) % 7);
        const prev_val = linearSums[prev_li];
        const next_val = linearSums[next_li];
        const originalDayForPrev = (prev_li + 1) % 7;
        const originalDayForNext = (next_li + 1) % 7;
        const num_missing = end_gap - start_gap + 1;
        const num_intervals = num_missing + 1;
        const is_full_middle_gap = (start_gap === 1 && end_gap === 5);

        if (is_full_middle_gap) {
            const mean_val = Math.floor((prev_val + next_val) / 2);
            for (let p = start_gap; p <= end_gap; p++) {
                linearSums[p] = mean_val;
            }
        } else if (dayCounts[originalDayForPrev] == 0 || dayCounts[originalDayForNext] == 0) {
            for (let p = start_gap; p <= end_gap; p++) {
                linearSums[p] = overallMean;
            }
        } else {
            for (let k = 1; k <= num_missing; k++) {
                const p = start_gap + k - 1;
                const fraction = k / num_intervals;
                const val = prev_val + fraction * (next_val - prev_val);
                linearSums[p] = Math.floor(val);
            }
        }
    }

    // Set result
    for (let li = 0; li < 7; li++) {
        result[weekOrder[li]] = linearSums[li];
    }

    return result;
}

module.exports = solution;
